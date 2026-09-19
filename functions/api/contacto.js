/*
 * Cloudflare Pages Function: recibe el formulario de diagnóstico y lo manda
 * por correo usando Resend (https://resend.com).
 *
 *   POST /api/contacto   { nombre, empresa, correo, telefono, necesidad, interes }
 *
 * Variables en Cloudflare → Settings → Environment variables (Production y Preview):
 *   RESEND_API_KEY  llave de Resend. Guárdala como "Secret", no como texto plano.
 *   LEAD_TO         (opcional) bandeja que recibe los leads, o varias separadas
 *                   por coma. Por omisión, DEFAULT_TO.
 *   LEAD_FROM       (opcional) remitente. Debe estar en un dominio verificado en
 *                   Resend. Por omisión, DEFAULT_FROM. Para probar antes de
 *                   verificar loomware.com.mx: "Loomware <onboarding@resend.dev>".
 */
const DEFAULT_TO = 'aldo_sanchez@loomware.com.mx'
const DEFAULT_FROM = 'Loomware <web@loomware.com.mx>'
const MAX_LEN = 2000

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })

const clean = (v) => String(v ?? '').trim().slice(0, MAX_LEN)
const escape = (v) =>
  clean(v).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) return json({ error: 'Falta configurar RESEND_API_KEY' }, 500)

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Solicitud inválida' }, 400)
  }

  // Honeypot: los bots llenan todos los campos; la persona nunca ve este.
  if (clean(body._gotcha)) return json({ ok: true })

  const lead = {
    nombre: clean(body.nombre),
    empresa: clean(body.empresa),
    correo: clean(body.correo),
    telefono: clean(body.telefono),
    necesidad: clean(body.necesidad),
    interes: clean(body.interes),
  }

  const faltantes = ['nombre', 'empresa', 'correo', 'telefono'].filter((k) => !lead[k])
  if (faltantes.length) return json({ error: `Faltan datos: ${faltantes.join(', ')}` }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.correo)) {
    return json({ error: 'El correo no parece válido' }, 400)
  }

  const filas = [
    ['Nombre', lead.nombre],
    ['Empresa', lead.empresa],
    ['Correo', lead.correo],
    ['WhatsApp / teléfono', lead.telefono],
    ['Interés principal', lead.interes || '—'],
    ['Necesidad', lead.necesidad || '—'],
  ]

  const texto = filas.map(([k, v]) => `${k}: ${v}`).join('\n')
  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;color:#0b1739;max-width:560px">
      <h2 style="margin:0 0 4px;font-size:18px">Nueva solicitud de diagnóstico</h2>
      <p style="margin:0 0 16px;color:#6b7390;font-size:13px">Enviada desde loomware.com.mx</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${filas
          .map(
            ([k, v]) => `<tr>
              <td style="padding:8px 12px 8px 0;color:#6b7390;white-space:nowrap;vertical-align:top;border-bottom:1px solid #e6e8f2">${k}</td>
              <td style="padding:8px 0;border-bottom:1px solid #e6e8f2">${escape(v)}</td>
            </tr>`,
          )
          .join('')}
      </table>
      <p style="margin:16px 0 0;font-size:13px">
        Responde a este correo para contestarle directamente a ${escape(lead.nombre)}.
      </p>
    </div>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.LEAD_FROM || DEFAULT_FROM,
      to: (env.LEAD_TO || DEFAULT_TO).split(',').map((s) => s.trim()).filter(Boolean),
      reply_to: lead.correo,
      subject: `Diagnóstico — ${lead.empresa} (${lead.nombre})`,
      text: texto,
      html,
    }),
  })

  if (!res.ok) {
    // El detalle de Resend se queda en el log; al visitante sólo le decimos que falló.
    console.error('Resend', res.status, await res.text())
    return json({ error: 'No pudimos enviar tu solicitud en este momento.' }, 502)
  }

  return json({ ok: true })
}

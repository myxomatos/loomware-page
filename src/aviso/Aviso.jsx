import Logo from '../components/Logo'
import Icon from '../components/Icon'
import {
  EMPRESA,
  DOMINIO,
  EMAIL,
  CIUDAD,
  RAZON_SOCIAL,
  DOMICILIO,
  AVISO_ACTUALIZADO,
} from '../data/contacto'
import './aviso.css'

/*
 * Aviso de privacidad integral conforme a la Ley Federal de Protección de
 * Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.
 * Los datos legales del responsable salen de src/data/contacto.js.
 */
const RESPONSABLE = RAZON_SOCIAL || EMPRESA
const DOMICILIO_TXT = DOMICILIO || CIUDAD

const SECCIONES = [
  {
    id: 'responsable',
    titulo: '1. Identidad y domicilio del responsable',
    parrafos: [
      `${RESPONSABLE}, en adelante "${EMPRESA}", con domicilio en ${DOMICILIO_TXT}, es el responsable del tratamiento de los datos personales que usted proporciona a través del sitio ${DOMINIO.replace('https://', '')} y de los canales de contacto que en él se indican.`,
    ],
  },
  {
    id: 'datos',
    titulo: '2. Datos personales que recabamos',
    parrafos: [
      'Para atender su solicitud de diagnóstico o contacto recabamos los siguientes datos:',
    ],
    lista: [
      'Datos de identificación: nombre completo.',
      'Datos de contacto: correo electrónico y número de teléfono o WhatsApp.',
      'Datos laborales: empresa a la que pertenece.',
      'La descripción que usted mismo escriba sobre su necesidad, y el interés que seleccione en el formulario.',
      'Datos de navegación recabados automáticamente por el sitio: dirección IP, tipo de navegador, páginas visitadas y fecha de acceso (véase la sección de cookies).',
    ],
    cierre: `No recabamos datos personales sensibles. Si en el campo de texto libre usted incluye información de esa naturaleza, entenderemos que consiente su tratamiento para las finalidades aquí descritas.`,
  },
  {
    id: 'finalidades',
    titulo: '3. Finalidades del tratamiento',
    parrafos: ['Finalidades primarias, necesarias para la relación que usted solicita:'],
    lista: [
      'Atender su solicitud de diagnóstico y ponernos en contacto con usted por correo, teléfono o WhatsApp.',
      'Analizar la información que nos comparte para elaborar una propuesta de solución.',
      'Dar seguimiento a la relación comercial que, en su caso, se establezca.',
    ],
    parrafos2: ['Finalidades secundarias, que no son necesarias para la relación pero nos permiten brindarle una mejor atención:'],
    lista2: [
      'Enviarle información sobre servicios, novedades o contenidos de ' + EMPRESA + ' que puedan ser de su interés.',
      'Elaborar estadísticas internas sobre el uso del sitio y la procedencia de las solicitudes.',
    ],
    cierre: `Si no desea que sus datos se traten para las finalidades secundarias, puede indicarlo en cualquier momento escribiendo a ${EMAIL}. Su negativa no afectará la atención de su solicitud.`,
  },
  {
    id: 'transferencias',
    titulo: '4. Transferencias y encargados',
    parrafos: [
      `${EMPRESA} no vende, renta ni transfiere sus datos personales a terceros con fines distintos a los aquí descritos.`,
      'Para operar el sitio y atender su solicitud utilizamos proveedores que actúan como encargados del tratamiento y sólo acceden a los datos en la medida necesaria para prestar su servicio: alojamiento del sitio y de sus formularios, envío de correo electrónico transaccional y, en su caso, herramientas de analítica web. Algunos de estos proveedores operan infraestructura fuera de México; en todos los casos están obligados contractualmente a proteger sus datos con al menos el mismo nivel de seguridad que este aviso.',
      'Fuera de lo anterior, sólo comunicaremos sus datos cuando una autoridad competente lo requiera conforme a la ley.',
    ],
  },
  {
    id: 'arco',
    titulo: '5. Derechos ARCO y revocación del consentimiento',
    parrafos: [
      'Usted tiene derecho a conocer qué datos personales tenemos, para qué los utilizamos y las condiciones de su uso (Acceso); a solicitar su corrección cuando sean inexactos o estén desactualizados (Rectificación); a que los eliminemos de nuestros registros cuando considere que no se están utilizando conforme a este aviso (Cancelación), y a oponerse a su uso para fines específicos (Oposición). Asimismo, puede revocar en cualquier momento el consentimiento que nos haya otorgado.',
      `Para ejercer cualquiera de estos derechos envíe un correo a ${EMAIL} indicando su nombre completo, el medio para comunicarle la respuesta, una descripción clara del derecho que desea ejercer y, en su caso, los documentos que acrediten su identidad. Responderemos en un plazo máximo de 20 días hábiles contados a partir de la recepción de su solicitud.`,
      'Si considera que su derecho a la protección de datos ha sido vulnerado, puede acudir ante la autoridad competente en materia de protección de datos personales en México.',
    ],
  },
  {
    id: 'limitar',
    titulo: '6. Limitar el uso o divulgación de sus datos',
    parrafos: [
      `Puede solicitar que dejemos de contactarle con fines comerciales escribiendo a ${EMAIL}. Le registraremos en nuestro listado interno de exclusión.`,
    ],
  },
  {
    id: 'cookies',
    titulo: '7. Cookies y tecnologías de rastreo',
    parrafos: [
      'El sitio puede utilizar cookies y tecnologías similares para recordar sus preferencias y para medir, de forma agregada y sin identificarle, cómo se utiliza el sitio: páginas vistas, tiempo de permanencia y origen de la visita. Esa información nos sirve para mejorar el contenido.',
      'Usted puede deshabilitar las cookies desde la configuración de su navegador. El sitio seguirá funcionando; sólo dejaremos de recibir esa información de uso.',
    ],
  },
  {
    id: 'cambios',
    titulo: '8. Cambios a este aviso',
    parrafos: [
      `Este aviso puede modificarse para atender cambios legales, de nuestras prácticas o de los servicios que ofrecemos. Cualquier cambio se publicará en esta misma dirección, ${DOMINIO.replace('https://', '')}/aviso-de-privacidad, con la fecha de su última actualización.`,
    ],
  },
]

export default function Aviso() {
  return (
    <main className="aviso">
      <header className="aviso__cabecera">
        <div className="container aviso__nav">
          <a href="/" aria-label="Loomware — inicio">
            <Logo />
          </a>
          <a href="/" className="link-arrow">
            <Icon name="arrow-right" size={16} style={{ transform: 'rotate(180deg)' }} />
            Volver al sitio
          </a>
        </div>
      </header>

      <article className="container aviso__cuerpo">
        <span className="eyebrow eyebrow--purple">Legal</span>
        <h1 className="aviso__titulo">Aviso de privacidad</h1>
        <p className="aviso__fecha">Última actualización: {AVISO_ACTUALIZADO}</p>
        <p className="aviso__intro">
          En {EMPRESA} tratamos sus datos personales con responsabilidad. Este aviso explica qué
          información recabamos cuando usa nuestro sitio o nos contacta, para qué la usamos, con
          quién la compartimos y cómo puede ejercer sus derechos sobre ella.
        </p>

        <nav className="aviso__indice" aria-label="Contenido del aviso">
          <ol>
            {SECCIONES.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.titulo.replace(/^\d+\.\s/, '')}</a>
              </li>
            ))}
          </ol>
        </nav>

        {SECCIONES.map((s) => (
          <section key={s.id} id={s.id} className="aviso__seccion">
            <h2>{s.titulo}</h2>
            {s.parrafos.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            {s.lista && (
              <ul>
                {s.lista.map((l) => (
                  <li key={l.slice(0, 40)}>{l}</li>
                ))}
              </ul>
            )}
            {s.parrafos2 && s.parrafos2.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            {s.lista2 && (
              <ul>
                {s.lista2.map((l) => (
                  <li key={l.slice(0, 40)}>{l}</li>
                ))}
              </ul>
            )}
            {s.cierre && <p>{s.cierre}</p>}
          </section>
        ))}

        <section className="aviso__seccion aviso__contacto">
          <h2>Contacto para temas de privacidad</h2>
          <p>
            <Icon name="mail" size={16} /> <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </section>
      </article>
    </main>
  )
}

#!/bin/sh
# Recordatorio de las skills del proyecto, en cada mensaje.
#
# Antes esto era `cat skills.txt` a secas, y ahí estaba el problema: el plugin
# se activa en `.claude/settings.json`, que viaja con el repositorio, pero
# **instalarlo es por máquina**. En la de Alan nunca se instaló, así que el
# recordatorio le sugería siete skills que no existían: al invocarlas
# respondían «Unknown skill» y se perdía el intento.
#
# Ahora se comprueba antes. Si el plugin está, sale la lista de siempre; si no,
# sale cómo instalarlo. Un recordatorio que promete lo que no hay es peor que
# no tener recordatorio.
#
# La comprobación es a prueba de rutas: busca «mattpocock» en cualquier archivo
# de marketplaces sincronizados y en los nombres de las carpetas de plugins, en
# el directorio del usuario y en el del proyecto. Si Claude Code cambia dónde
# los guarda, el peor caso es que salgan las instrucciones de instalación de
# más, no que vuelva a prometer skills fantasma.
set -u

RAIZ="${CLAUDE_PROJECT_DIR:-.}"
BASE="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"

instalado=no
for f in "$BASE"/plugins/synced/*/.marketplaces.json "$BASE"/plugins/*.json "$RAIZ"/.claude/plugins/*.json; do
  [ -f "$f" ] || continue
  if grep -qi 'mattpocock' "$f" 2>/dev/null; then instalado=si; break; fi
done
if [ "$instalado" = no ]; then
  for d in "$BASE"/plugins/*mattpocock* "$BASE"/plugins/*/*mattpocock* "$RAIZ"/.claude/plugins/*mattpocock*; do
    [ -e "$d" ] && { instalado=si; break; }
  done
fi

if [ "$instalado" = si ]; then
  cat "$RAIZ/.claude/hooks/skills.txt"
else
  cat <<'FIN'
Aviso del proyecto: las skills de mattpocock-skills están activadas en
.claude/settings.json pero NO instaladas en esta máquina, así que invocarlas
falla con «Unknown skill». Instalarlas es por máquina, no viaja con el repo:

  /plugin marketplace add mattpocock/skills
  /plugin install mattpocock-skills@mattpocock

Mientras tanto, trabaja normal y dilo una vez si una habría servido.
FIN
fi

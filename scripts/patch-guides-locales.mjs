/**
 * Apply translated guides overlays after merge-tool-fragments.mjs
 * Run: node scripts/patch-guides-locales.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function deepMerge(t, s) {
  for (const [k, v] of Object.entries(s)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      if (!t[k] || typeof t[k] !== 'object') t[k] = {}
      deepMerge(t[k], v)
    } else {
      t[k] = v
    }
  }
  return t
}

const overlays = {
  es: {
    hub: {
      metaTitle: 'Guías de Fortnite',
      metaDescription:
        'Cómo reembolsar skins de Fortnite y canjear V-Bucks / códigos de creador — guías prácticas de cuenta Epic en FortniteTools.',
      eyebrow: 'Guías',
      title: 'Guías de Fortnite',
      description:
        'Guías prácticas paso a paso sobre reembolsos, códigos y acciones de cuenta. Las guías de meta de temporada se mantienen en las herramientas en inglés y el mapa interactivo.',
      all: 'Todas',
      howTo: 'Cómo hacer',
      categoryEyebrow: 'Categoría',
      categoryTitle: 'Guías prácticas de Fortnite',
      categoryDescription: 'Cuenta, reembolsos, códigos y guías prácticas paso a paso',
      minRead: '{minutes} min de lectura',
      home: 'Inicio',
      related: 'También te puede interesar',
      browseCategories: 'Explorar categorías',
      previous: 'Anterior',
      next: 'Siguiente',
      comingSoon: 'Artículo completo próximamente. ¡Vuelve pronto!',
    },
    refund: {
      metaTitle: 'Cómo reembolsar skins y compras del Item Shop de Fortnite',
      metaDescription:
        'Reglas oficiales de reembolso de Epic: Cancel Purchase en 24 horas, Return Tickets en 30 días, qué no se puede reembolsar y cómo recuperar tus V-Bucks.',
      title: 'Cómo reembolsar skins y compras del Item Shop de Fortnite',
      excerpt:
        'Reglas oficiales de reembolso de Epic: Cancel Purchase en 24 horas, Return Tickets en 30 días, qué no se puede reembolsar y cómo recuperar tus V-Bucks.',
      content: `## Dos herramientas oficiales: Cancel Purchase y Return Tickets

Epic te permite revertir muchas **compras de cosméticos del Item Shop hechas con V-Bucks** sin tener que escribir a soporte, siempre que actúes dentro de los plazos y el artículo sea elegible.

Esta guía sigue la ayuda oficial de Epic sobre facturación de Fortnite Battle Royale para cancelar o reembolsar compras del Item Shop hechas con V-Bucks. Las políticas pueden actualizarse; si la interfaz del juego no coincide con esta página, confía en el juego y en Epic Help.

Última revisión: agosto de 2026. Lecturas relacionadas: el [rastreador del Item Shop](/tools/item-shop) y [cómo canjear un código de Fortnite](/guides/how-to/how-to-redeem-fortnite-code).

## Comparación rápida

| Herramienta | Plazo | Límite adicional | Ideal para |
| --- | --- | --- | --- |
| **Cancel Purchase** | Dentro de las **24 horas** tras la compra | El artículo debe estar **sin usar / sin equipar** en todos los modos | Compra accidental el mismo día |
| **Return Ticket** | Artículo comprado en los últimos **30 días** | Los tickets son limitados (ver abajo) | Errores que notas después de 24 horas |
| **Solicitud de reembolso en dinero real** | Flujo de reembolso independiente de Epic | Para compras en efectivo de paquetes de V-Bucks, no todos los cosméticos | Compraste el paquete de V-Bucks equivocado con dinero |

Las compras hechas dentro de **islas Creative creadas por desarrolladores** no pueden usar Cancel Purchase ni Return Tickets.

## Qué no puedes reembolsar normalmente con Cancel Purchase / Return Tickets

El artículo de ayuda de Epic enumera categorías que no se pueden devolver con estas herramientas, entre ellas:

- Battle Pass / Festival y otros pases
- Niveles de pase y rutas de recompensas premium
- **Paquetes** de cosméticos (los Return Tickets pueden exigir devolver todo el paquete elegible junto, cuando se permiten paquetes; sigue el aviso en el juego)
- Compras **regaladas**
- Level Up Quest Packs
- Llamas de botín de Save the World / ciertos artículos de la tienda de STW
- Compras de islas de desarrolladores

Si tu arrepentimiento es un Battle Pass, las herramientas de reembolso de cosméticos de Epic no lo revertirán. Gasta tus V-Bucks con cuidado usando la [calculadora de V-Bucks](/tools/vbucks-calculator) antes de confirmar.

## Cómo usar Cancel Purchase (deshacer en 24 horas)

Úsalo cuando compraste la skin equivocada hace unos minutos y nunca la equipaste.

1. Abre Fortnite y ve a tu **Locker** / historial de compras del artículo (las etiquetas de ruta pueden mostrar **Cancel Purchase** en los detalles del artículo).
2. Selecciona el artículo que acabas de comprar.
3. Elige **Cancel Purchase** si el botón está disponible.
4. Confirma. El cosmético se elimina y los V-Bucks vuelven a tu saldo.

### Cancel Purchase falla cuando

- Han pasado más de 24 horas
- Equipaste o usaste el artículo en cualquier modo (incluyendo Creative / Festival / LEGO cuando aplique)
- El tipo de artículo está en la lista de no reembolsables
- Ya cancelaste esa compra una vez (Epic indica que cada artículo solo puede cancelarse una vez; volver a comprarlo puede mostrar un aviso)

## Cómo usar un Return Ticket (plazo de 30 días)

Si Cancel Purchase ya no está disponible, revisa si tienes un **Return Ticket**.

Reglas publicadas por Epic sobre los tickets (verifica en tu cuenta; Epic ha ajustado las asignaciones a lo largo de los años):

- Las cuentas se aprovisionan con Return Tickets (normalmente se describe que empiezan con **3**)
- Normalmente recibes **1 ticket nuevo cada 365 días**
- Puedes tener un máximo limitado a la vez (normalmente **3**)

### Pasos

1. Abre el artículo en tu locker / interfaz de reembolso.
2. Elige la opción de Return Ticket cuando se ofrezca.
3. Confirma. Los V-Bucks vuelven y el artículo sale de tu cuenta.
4. Para paquetes elegibles, devuelve el conjunto completo cuando la interfaz lo requiera.

Los Return Tickets son valiosos. No gastes uno en un spray de 200 V-Bucks si luego podrías hacer clic por error en un traje de 2000 V-Bucks.

## Compras en dinero real (paquetes de V-Bucks, Crew, etc.)

Si gastaste **dinero real** en paquetes de V-Bucks o suscripciones y necesitas un reembolso en efectivo, usa el flujo de **Solicitud de reembolso** de Epic en el sitio web de Epic Games, no el botón de Return Ticket dentro del juego. Las tiendas de plataforma (PlayStation, Xbox, Nintendo) también pueden requerir reembolsos a través de Sony / Microsoft / Nintendo en lugar de Epic, según dónde pagaste.

## Skins regaladas

Los regalos normalmente **no se pueden reembolsar** mediante Cancel Purchase / Return Tickets. Si te estafaron en un intercambio de regalos, eso es un problema de seguridad de la cuenta: activa el 2FA de Epic en [epicgames.com/account/password](https://www.epicgames.com/account/password) y contacta a Epic Support con los detalles del pedido. No uses "prestamistas de cuenta" para intentar forzar un reembolso.

## Buenos hábitos para reembolsar menos a menudo

- Previsualiza los estilos en la tienda antes de comprar
- Revisa las piezas del set en el [rastreador del Item Shop](/tools/item-shop)
- Evita comprar mientras hay overlays de stream o amigos presionándote a "comprarlo"
- Guarda al menos un Return Ticket de reserva
- Nunca equipes una compra dudosa hasta estar seguro: equiparla puede anular la elegibilidad para Cancel Purchase

## Preguntas frecuentes

### ¿Los V-Bucks reembolsados vuelven al instante?

Normalmente sí, en pantalla tras confirmar. Reinicia el cliente si la interfaz del saldo se retrasa.

### ¿Puedo reembolsar una skin de la temporada pasada?

Solo si todavía está dentro del plazo de **30 días** de compra del Return Ticket y es elegible. Los artículos del locker más antiguos fuera de ese plazo se quedan en la cuenta.

### ¿Reembolsar afecta mi estado de cuenta?

Usar las herramientas oficiales de Cancel Purchase / Return Ticket como están diseñadas es normal. Las devoluciones de cargo (chargebacks) en compras con dinero real pueden bloquear las compras y arriesgar acciones sobre la cuenta; usa la solicitud de reembolso oficial de Epic en lugar de disputar con tu banco como primer paso.`,
    },
    redeem: {
      metaTitle: 'Cómo canjear un código de Fortnite (tarjetas de V-Bucks + códigos de creador)',
      metaDescription:
        'Canjea tarjetas de regalo de V-Bucks en PC, Switch, PlayStation y Xbox — y cómo funcionan los códigos de Support-A-Creator en el Item Shop, evitando errores de cuenta equivocada.',
      title: 'Cómo canjear un código de Fortnite (tarjetas de V-Bucks + códigos de creador)',
      excerpt:
        'Canjea tarjetas de regalo de V-Bucks en PC, Switch, PlayStation y Xbox — y cómo funcionan los códigos de Support-A-Creator en el Item Shop, evitando errores de cuenta equivocada.',
      content: `## Dos tipos distintos de "códigos de Fortnite" (no los confundas)

Los jugadores buscan "canjear código de Fortnite" para dos sistemas totalmente distintos:

| Tipo de código | Qué hace | Dónde se introduce |
| --- | --- | --- |
| **PIN de tarjeta de regalo de V-Bucks / Fortnite** | Añade V-Bucks prepagados a una cuenta Epic (aplican reglas de plataforma) | El sitio oficial [V-Bucks Card](https://www.fortnite.com/vbuckscard), **no** el cuadro de búsqueda del Item Shop dentro del juego |
| **Código de Support-A-Creator / creador** | Da al creador un porcentaje de las compras elegibles; **no** te da V-Bucks gratis | Fortnite **Item Shop → Enter Code** (o el campo de código de creador al pagar) |

Si compraste una tarjeta física e intentas escribir el PIN como código de creador, fallará. Si escribes la etiqueta de creador de un streamer en el sitio de la tarjeta de V-Bucks, también fallará.

Última revisión: 1 de agosto de 2026. Ayuda oficial de la tarjeta de V-Bucks: [Cómo canjear una tarjeta de V-Bucks](https://www.epicgames.com/help/en-US/c-Category_Fortnite/c-Fortnite_Billingandpayment/how-to-redeem-a-v-bucks-card-a000084845). Guarda tu recibo hasta que el saldo se muestre correctamente.

Relacionado: [reembolsos](/guides/how-to/how-to-refund-fortnite-skins), [calculadora de V-Bucks](/tools/vbucks-calculator), [Item Shop](/tools/item-shop).

## Antes de canjear cualquier cosa

1. Inicia sesión en la **cuenta Epic dueña de tu locker**; revisa las skins en [epicgames.com/account](https://www.epicgames.com/account) antes de pegar un PIN.
2. Confirma que el perfil de consola / Microsoft / PlayStation que vas a seleccionar está vinculado a ese ID de Epic en Cuenta → Conexiones.
3. Activa el 2FA de Epic en [epicgames.com/account/password](https://www.epicgames.com/account/password) para que un PC familiar compartido no gaste tu tarjeta en la sesión equivocada.
4. Raspa el PIN con cuidado; no compres "verificadores de código" ni "bots de canje" de Discord.

## Cómo canjear una tarjeta de V-Bucks (todas las plataformas empiezan aquí)

El flujo de Epic es principalmente web. Generalmente **no puedes** completar una tarjeta física de V-Bucks solo pegando el PIN dentro del cliente de Fortnite.

1. Abre [fortnite.com/vbuckscard](https://www.fortnite.com/vbuckscard) en un navegador.
2. Haz clic en **Get Started** e inicia sesión en la cuenta correcta de Epic Games (usa los botones de inicio de sesión de consola si así te autenticas normalmente).
3. Introduce el PIN del reverso de la tarjeta / correo digital, normalmente **sin guiones**.
4. Haz clic en **Next**.
5. Elige la **plataforma / dispositivo** en el que juegas Fortnite. Solo aparecen las plataformas vinculadas; si falta la tuya, arregla primero las Conexiones.
6. Revisa el nombre de la cuenta Epic, el dispositivo y el saldo proyectado, luego **Confirm**.

### PC, Nintendo Switch y móvil

Tras Confirm, los V-Bucks suelen añadirse a la billetera de Epic para esa ruta de plataforma. Abre Fortnite, ve al Item Shop y verifica el saldo. Cierra y vuelve a abrir el juego una vez si la interfaz se retrasa.

### PlayStation (PS5 / PS4) — requiere un código secundario

Elegir PlayStation genera un **código secundario de PlayStation Store** (Epic lo muestra y/o lo envía por correo). Debes canjear ese código en la **cuenta de Sony vinculada a tu Epic**:

1. Completa el paso Confirm de fortnite.com/vbuckscard con **PlayStation** seleccionado.
2. Copia el código secundario que proporciona Epic.
3. Canjéalo en la PlayStation Store (consola: Ajustes / PlayStation Store → Canjear códigos, o la página web de canje de Sony mientras estás en la PSN correcta).
4. Usa una **ventana de incógnito** si tienes varias sesiones de PSN; canjear en el ID de Sony equivocado es la pesadilla número uno de soporte.
5. Vuelve a abrir Fortnite en esa PSN y revisa los V-Bucks.

### Xbox — requiere un código secundario de Microsoft

Mismo patrón de dos pasos que PlayStation:

1. Confirma en fortnite.com/vbuckscard con **Xbox** seleccionado.
2. Copia el código secundario de **Microsoft / Xbox** tipo prepago que genera Epic.
3. Canjéalo en la cuenta de Microsoft vinculada a tu Epic (interfaz de canje de la consola Xbox o el sitio de canje de Microsoft).
4. Vuelve a abrir Fortnite y verifica el saldo.

La ayuda de Epic señala explícitamente que Xbox / PlayStation necesitan este paso de canje secundario; PC / Switch / móvil generalmente no.

## Códigos de creador (Support-A-Creator) — cómo funcionan realmente

Un código de creador **no** desbloquea skins ni añade V-Bucks. Le indica a Epic qué creador debe recibir una parte de las compras **elegibles** que hagas mientras el código esté activo.

### Cómo introducir un código de creador

1. Abre Fortnite y ve al **Item Shop**.
2. Busca **Enter Code** / Support-A-Creator (el texto varía ligeramente según el parche).
3. Escribe el código del creador exactamente (a menudo el nombre del streamer o una etiqueta corta).
4. Confirma. Deberías ver el nombre del creador aplicado durante un plazo limitado (Epic varía cuánto tiempo "se mantiene" un código; vuelve a introducirlo antes de compras grandes si tienes dudas).
5. Compra Battle Pass, paquetes de V-Bucks (cuando sean elegibles), Crew o cosméticos de la tienda como de costumbre.

### Preguntas frecuentes sobre códigos de creador que la gente confunde

- **No es un cupón.** El precio se mantiene igual.
- **No es el PIN de una tarjeta de V-Bucks.** Es un sistema diferente.
- **Los regalos / algunos SKU pueden no ser elegibles** según las reglas actuales de SAC de Epic; si el código no se aplica, la compra puede completarse igual sin apoyar a nadie.
- **Puedes cambiar de código** antes de pagar; normalmente gana el último código confirmado dentro de esa sesión/ventana.
- Los sitios de phishing que te piden "verificar el código de creador" con tu contraseña son estafas; usa solo el campo de la tienda dentro del juego o las páginas oficiales de Epic.

## Claves de Epic Games Store frente a tarjetas de V-Bucks de Fortnite

Algunos productos "Fortnite" físicos o tarjetas de billetera de Epic se canjean en las páginas de canje de la tienda de **epicgames.com** en lugar de fortnite.com/vbuckscard. Si el empaque dice **Epic Games Store** / saldo de billetera, sigue la URL de canje de Epic impresa en la tarjeta; no lo fuerces a través del sitio de la tarjeta de V-Bucks.

## Errores comunes de canje y soluciones

| Problema | Causa probable | Solución |
| --- | --- | --- |
| "Código no válido" | Error de tipeo, ya usado, tipo de producto incorrecto | Revisa el PIN de nuevo; no lo reutilices; confirma que es una tarjeta de V-Bucks y no una etiqueta de creador |
| Falta la plataforma en la lista | La consola no está vinculada a este Epic | Vincula la consola en Cuenta Epic → Conexiones y vuelve a intentarlo |
| Falta el saldo en PS/Xbox | Nunca se canjeó el código secundario | Revisa el correo / confirmación de Epic para el segundo código; canjéalo en el ID de Sony/Microsoft correcto |
| V-Bucks en el locker "equivocado" | Sesión iniciada en el Epic equivocado | Detente; contacta a Epic con el recibo; previene esto revisando el locker *antes* de Confirm |
| La tarjeta dice bloqueo regional | Límites de SKU regional | Canjea desde una tienda/cuenta que coincida con las reglas de región de la tarjeta |
| Cuenta infantil / controles parentales | Restricciones de compra | El tutor debe completar los pasos de canje en la tienda de la consola |

## Lista de seguridad (evitar estafas)

- Canjea solo en **fortnite.com** / **epicgames.com** / tiendas oficiales de consola
- Nunca envíes un PIN a "soporte" por Discord, DM de Instagram o "anfitriones de sorteos"
- Nunca publiques una captura de pantalla de un PIN completo sin usar
- Si un sitio pide tu contraseña **y** el PIN de la tarjeta juntos fuera del inicio de sesión de Epic, márchate
- Después de canjear, puedes gastar con la [calculadora de V-Bucks](/tools/vbucks-calculator) y revisar el [Item Shop](/tools/item-shop) antes de compras impulsivas

## Preguntas frecuentes

### ¿Puedo canjear una tarjeta de V-Bucks dentro de Fortnite?

No como flujo principal. Empieza en [fortnite.com/vbuckscard](https://www.fortnite.com/vbuckscard). Los jugadores de consola terminan luego en PlayStation Store / Microsoft Store cuando se les indique.

### ¿Los V-Bucks se transfieren entre PC y consola?

Los V-Bucks siguen las reglas de billetera de plataforma de Epic y cómo los canjeaste. Los cosméticos de progreso cruzado viven en la cuenta Epic, pero los saldos para gastar pueden estar separados por plataforma; canjea intencionalmente para el dispositivo en el que compras y lee la vista previa del saldo en pantalla de Epic antes de Confirm.

### ¿Puedo reembolsar una tarjeta ya canjeada?

Generalmente no, una vez canjeada. Guarda el recibo para Epic Support si el PIN falla o se registra incorrectamente. El arrepentimiento de un cosmético tras gastar V-Bucks es otra herramienta distinta: [guía de reembolsos](/guides/how-to/how-to-refund-fortnite-skins).

### ¿Cómo apoyo a un creador sin comprar nada?

Introducir un código por sí solo no hace nada hasta que hagas una compra elegible. Añade a tu lista de deseos con el [rastreador del Item Shop](/tools/item-shop) y compra cuando estés listo.`,
    },
  },
  de: {
    hub: {
      metaTitle: 'Fortnite-Guides',
      metaDescription:
        'So erhältst du eine Rückerstattung für Fortnite-Skins und löst V-Bucks- / Creator-Codes ein — praktische Epic-Account-Guides auf FortniteTools.',
      eyebrow: 'Guides',
      title: 'Fortnite-Guides',
      description:
        'Praktische Anleitungen für Rückerstattungen, Codes und Account-Aktionen. Saison-Meta-Guides bleiben auf den englischen Tools und der interaktiven Karte.',
      all: 'Alle',
      howTo: 'Anleitung',
      categoryEyebrow: 'Kategorie',
      categoryTitle: 'Fortnite-Anleitungen',
      categoryDescription: 'Account, Rückerstattungen, Codes und praktische Anleitungen',
      minRead: '{minutes} Min. Lesezeit',
      home: 'Start',
      related: 'Das könnte dich auch interessieren',
      browseCategories: 'Kategorien durchsuchen',
      previous: 'Zurück',
      next: 'Weiter',
      comingSoon: 'Vollständiger Artikel folgt in Kürze. Schau später wieder vorbei!',
    },
    refund: {
      metaTitle: 'So erhältst du eine Rückerstattung für Fortnite-Skins und Item-Shop-Käufe',
      metaDescription:
        'Offizielle Epic-Rückerstattungsregeln: Cancel Purchase innerhalb von 24 Stunden, Return Tickets innerhalb von 30 Tagen, was nicht erstattet werden kann und wie du deine V-Bucks zurückbekommst.',
      title: 'So erhältst du eine Rückerstattung für Fortnite-Skins und Item-Shop-Käufe',
      excerpt:
        'Offizielle Epic-Rückerstattungsregeln: Cancel Purchase innerhalb von 24 Stunden, Return Tickets innerhalb von 30 Tagen, was nicht erstattet werden kann und wie du deine V-Bucks zurückbekommst.',
      content: `## Zwei offizielle Tools: Cancel Purchase und Return Tickets

Epic erlaubt es dir, viele **mit V-Bucks bezahlte Item-Shop-Käufe** von Kosmetik zu widerrufen, ohne den Support zu kontaktieren — sofern du innerhalb der Fristen handelst und der Artikel berechtigt ist.

Dieser Guide folgt Epics offizieller Fortnite-Battle-Royale-Hilfe zum Stornieren oder Erstatten von mit V-Bucks getätigten Item-Shop-Käufen. Richtlinien können sich ändern; wenn die Ingame-UI dieser Seite widerspricht, vertraue dem Spiel und der Epic-Hilfe.

Letzte Überprüfung: August 2026. Weiterführende Links: der [Item-Shop-Tracker](/tools/item-shop) und [wie man einen Fortnite-Code einlöst](/guides/how-to/how-to-redeem-fortnite-code).

## Schnellvergleich

| Tool | Zeitfenster | Zusätzliche Grenze | Am besten für |
| --- | --- | --- | --- |
| **Cancel Purchase** | Innerhalb von **24 Stunden** nach dem Kauf | Artikel muss in jedem Modus **ungenutzt / nicht ausgerüstet** sein | Versehentlicher Kauf am selben Tag |
| **Return Ticket** | Artikel innerhalb der letzten **30 Tage** gekauft | Tickets sind begrenzt (siehe unten) | Fehler, die du nach 24 Stunden bemerkst |
| **Antrag auf Echtgeld-Rückerstattung** | Separater Epic-Rückerstattungsprozess | Für Echtgeldkäufe von V-Bucks / Paketen, nicht für jedes Kosmetikitem | Falsches V-Bucks-Paket mit echtem Geld gekauft |

Käufe innerhalb von **von Entwicklern erstellten Creative-Inseln** können nicht mit Cancel Purchase oder Return Tickets rückgängig gemacht werden.

## Was du mit Cancel Purchase / Return Tickets in der Regel nicht erstatten kannst

Epics Hilfeartikel listet Kategorien auf, die über diese Tools nicht zurückgegeben werden können, darunter:

- Battle Passes / Festival- und andere Pässe
- Pass-Level und Premium-Belohnungsstrecken
- Kosmetik-**Bundles** (Return Tickets können erfordern, dass das gesamte berechtigte Bundle zusammen zurückgegeben wird, wenn Bundles erlaubt sind — folge dem Hinweis im Spiel)
- **Verschenkte** Käufe
- Level Up Quest Packs
- Save-the-World-Loot-Llamas / bestimmte STW-Shop-Artikel
- Käufe auf Entwickler-Inseln

Wenn du einen Battle Pass bereust, wird Epics Kosmetik-Rückerstattungstool ihn nicht widerrufen. Gib deine V-Bucks sorgfältig aus, mit dem [V-Bucks-Rechner](/tools/vbucks-calculator), bevor du bestätigst.

## So funktioniert Cancel Purchase (24-Stunden-Rückgängig)

Nutze dies, wenn du vor wenigen Minuten den falschen Skin gekauft und ihn nie ausgerüstet hast.

1. Starte Fortnite und öffne dein **Locker** / den Kaufhistorien-Eintrag für den Artikel (Pfadbezeichnungen können in den Artikeldetails **Cancel Purchase** anzeigen).
2. Wähle den gerade gekauften Artikel aus.
3. Wähle **Cancel Purchase**, falls die Schaltfläche verfügbar ist.
4. Bestätige. Das Kosmetikitem wird entfernt und die V-Bucks kehren zu deinem Guthaben zurück.

### Cancel Purchase schlägt fehl, wenn

- Mehr als 24 Stunden vergangen sind
- Du den Artikel in irgendeinem Modus ausgerüstet oder benutzt hast (auch Creative / Festival / LEGO, wo zutreffend)
- Der Artikeltyp auf der Liste der nicht erstattungsfähigen Artikel steht
- Du diesen Kauf bereits einmal storniert hast (Epic weist darauf hin, dass jeder Artikel nur einmal storniert werden kann; ein erneuter Kauf kann einen Hinweis anzeigen)

## So nutzt du ein Return Ticket (30-Tage-Fenster)

Wenn Cancel Purchase nicht mehr verfügbar ist, prüfe, ob du ein **Return Ticket** hast.

Epics veröffentlichte Ticket-Regeln (überprüfe in deinem Account — Epic hat die Vergabe über die Jahre angepasst):

- Accounts werden mit Return Tickets ausgestattet (meist mit **3** Start-Tickets beschrieben)
- Du erhältst normalerweise **1 neues Ticket alle 365 Tage**
- Du kannst gleichzeitig ein begrenztes Maximum halten (meist **3**)

### Schritte

1. Öffne den Artikel in deinem Locker / der Rückerstattungs-UI.
2. Wähle die Return-Ticket-Option, wenn sie angeboten wird.
3. Bestätige. V-Bucks kehren zurück und der Artikel verlässt deinen Account.
4. Bei berechtigten Bundles gib das gesamte Set zusammen zurück, wenn die UI dies verlangt.

Return Tickets sind wertvoll. Verschwende keines für einen 200-V-Bucks-Spray, falls du später versehentlich ein 2.000-V-Bucks-Outfit anklickst.

## Echtgeldkäufe (V-Bucks-Pakete, Crew usw.)

Wenn du **echtes Geld** für V-Bucks-Pakete oder Abonnements ausgegeben hast und eine Bargeld-Rückerstattung benötigst, nutze Epics **Refund-Request**-Prozess auf der Epic Games-Website — nicht die Return-Ticket-Schaltfläche im Spiel. Plattform-Stores (PlayStation, Xbox, Nintendo) können je nachdem, wo du bezahlt hast, ebenfalls Rückerstattungen über Sony / Microsoft / Nintendo statt über Epic erfordern.

## Verschenkte Skins

Geschenke sind über Cancel Purchase / Return Tickets in der Regel **nicht erstattungsfähig**. Wenn du bei einem Geschenk-Tausch betrogen wurdest, ist das ein Account-Sicherheitsproblem — aktiviere Epic-2FA unter [epicgames.com/account/password](https://www.epicgames.com/account/password) und kontaktiere den Epic Support mit den Bestelldetails. Nutze keine Account-Verleiher, um eine Rückerstattung zu "erzwingen".

## Kluge Gewohnheiten, um seltener erstatten zu müssen

- Sieh dir Styles im Shop an, bevor du kaufst
- Prüfe Set-Teile im [Item-Shop-Tracker](/tools/item-shop)
- Kaufe nicht unter dem Druck von Stream-Overlays oder Freunden, die "kauf es doch" spammen
- Behalte mindestens ein Return Ticket in Reserve
- Rüste einen fragwürdigen Kauf nie aus, bevor du sicher bist — Ausrüsten kann die Cancel-Purchase-Berechtigung beenden

## FAQ

### Kommen erstattete V-Bucks sofort zurück?

Normalerweise ja, direkt nach der Bestätigung auf dem Bildschirm sichtbar. Starte den Client neu, wenn die Guthaben-UI hinterherhinkt.

### Kann ich einen Skin aus der letzten Saison erstatten?

Nur wenn er noch innerhalb des **30-Tage**-Kauffensters für Return Tickets liegt und berechtigt ist. Ältere Locker-Artikel außerhalb dieses Fensters bleiben auf dem Account.

### Beeinflusst eine Erstattung meinen Account-Status?

Die offiziellen Cancel-Purchase- / Return-Ticket-Tools wie vorgesehen zu nutzen, ist normal. Chargebacks bei Echtgeldkäufen können Käufe blockieren und Account-Maßnahmen riskieren — nutze zuerst Epics offiziellen Rückerstattungsantrag, anstatt direkt bei deiner Bank zu widersprechen.`,
    },
    redeem: {
      metaTitle: 'So löst du einen Fortnite-Code ein (V-Bucks-Karten + Creator-Codes)',
      metaDescription:
        'Löse V-Bucks-Geschenkkarten auf PC, Switch, PlayStation und Xbox ein — und erfahre, wie Support-A-Creator-Codes im Item Shop funktionieren und wie du Fehler mit dem falschen Account vermeidest.',
      title: 'So löst du einen Fortnite-Code ein (V-Bucks-Karten + Creator-Codes)',
      excerpt:
        'Löse V-Bucks-Geschenkkarten auf PC, Switch, PlayStation und Xbox ein — und erfahre, wie Support-A-Creator-Codes im Item Shop funktionieren und wie du Fehler mit dem falschen Account vermeidest.',
      content: `## Zwei verschiedene "Fortnite-Codes" (nicht verwechseln)

Spieler suchen nach "Fortnite-Code einlösen" für zwei völlig unterschiedliche Systeme:

| Code-Typ | Was er macht | Wo du ihn eingibst |
| --- | --- | --- |
| **V-Bucks- / Fortnite-Geschenkkarten-PIN** | Fügt einem Epic-Account vorausbezahlte V-Bucks hinzu (Plattformregeln gelten) | Die offizielle [V-Bucks Card](https://www.fortnite.com/vbuckscard)-Seite — **nicht** die Ingame-Suche im Item Shop |
| **Support-A-Creator- / Creator-Code** | Gibt einem Creator einen Anteil an berechtigten Käufen; gibt dir **keine** kostenlosen V-Bucks | Fortnite **Item Shop → Enter Code** (oder das Creator-Code-Feld beim Bezahlen) |

Wenn du eine physische Karte gekauft hast und versuchst, die PIN als Creator-Code einzugeben, schlägt das fehl. Wenn du das Creator-Tag eines Streamers auf der V-Bucks-Karten-Website eingibst, schlägt das ebenfalls fehl.

Letzte Überprüfung: 1. August 2026. Offizielle V-Bucks-Karten-Hilfe: [So löst du eine V-Bucks-Karte ein](https://www.epicgames.com/help/en-US/c-Category_Fortnite/c-Fortnite_Billingandpayment/how-to-redeem-a-v-bucks-card-a000084845). Bewahre deinen Kaufbeleg auf, bis das Guthaben korrekt angezeigt wird.

Verwandt: [Rückerstattungen](/guides/how-to/how-to-refund-fortnite-skins), [V-Bucks-Rechner](/tools/vbucks-calculator), [Item Shop](/tools/item-shop).

## Bevor du irgendetwas einlöst

1. Melde dich im **Epic-Account an, dem dein Locker gehört** — prüfe deine Skins auf [epicgames.com/account](https://www.epicgames.com/account), bevor du eine PIN einfügst.
2. Bestätige, dass das Konsolen- / Microsoft- / PlayStation-Profil, das du auswählen wirst, unter Account → Verbindungen mit diesem Epic-Account verknüpft ist.
3. Aktiviere Epic-2FA unter [epicgames.com/account/password](https://www.epicgames.com/account/password), damit ein gemeinsam genutzter Familien-PC deine Karte nicht auf dem falschen Login verbrennt.
4. Rubbele die PIN vorsichtig frei; kaufe keine "Code-Checker" oder Discord-"Einlöse-Bots".

## So löst du eine V-Bucks-Karte ein (alle Plattformen starten hier)

Epics Prozess ist überwiegend webbasiert. Du kannst eine physische V-Bucks-Karte in der Regel **nicht** allein durch Einfügen der PIN im Fortnite-Client abschließen.

1. Öffne [fortnite.com/vbuckscard](https://www.fortnite.com/vbuckscard) in einem Browser.
2. Klicke auf **Get Started** und melde dich beim richtigen Epic-Games-Account an (nutze Konsolen-Login-Buttons, falls du dich normalerweise so authentifizierst).
3. Gib die PIN von der Kartenrückseite / der digitalen E-Mail ein — meist **ohne Bindestriche**.
4. Klicke auf **Next**.
5. Wähle die **Plattform / das Gerät**, auf dem du Fortnite spielst. Nur verknüpfte Plattformen werden angezeigt — fehlt deine, korrigiere zuerst die Verbindungen.
6. Überprüfe Epic-Accountname, Gerät und voraussichtliches Guthaben, dann **Confirm**.

### PC, Nintendo Switch und Mobilgeräte

Nach Confirm werden die V-Bucks in der Regel der Epic-Wallet für diesen Plattformpfad gutgeschrieben. Starte Fortnite, öffne den Item Shop und überprüfe das Guthaben. Beende die App einmal und starte sie neu, falls die UI hinterherhinkt.

### PlayStation (PS5 / PS4) — zusätzlicher Code erforderlich

Die Auswahl von PlayStation erzeugt einen **zusätzlichen PlayStation-Store-Code** (Epic zeigt ihn an und/oder sendet ihn per E-Mail). Du musst diesen Code auf dem **mit deinem Epic-Account verknüpften Sony-Account** einlösen:

1. Schließe den Confirm-Schritt auf fortnite.com/vbuckscard mit ausgewähltem **PlayStation** ab.
2. Kopiere den zusätzlichen Code, den Epic bereitstellt.
3. Löse ihn im PlayStation Store ein (Konsole: Einstellungen / PlayStation Store → Codes einlösen, oder Sonys Web-Einlöseseite, während du mit dem richtigen PSN-Account angemeldet bist).
4. Nutze ein **Inkognito-Fenster**, falls du mehrere PSN-Logins hast — das Einlösen auf dem falschen Sony-Account ist der häufigste Support-Albtraum.
5. Starte Fortnite auf diesem PSN neu und prüfe die V-Bucks.

### Xbox — zusätzlicher Microsoft-Code erforderlich

Gleiches Zweistufen-Muster wie PlayStation:

1. Bestätige auf fortnite.com/vbuckscard mit ausgewähltem **Xbox**.
2. Kopiere den zusätzlichen **Microsoft- / Xbox**-Prepaid-Code, den Epic generiert.
3. Löse ihn beim mit deinem Epic-Account verknüpften Microsoft-Account ein (Xbox-Konsolen-Einlöse-UI oder Microsofts Einlöseseite).
4. Starte Fortnite neu und überprüfe das Guthaben.

Epics Hilfeseite weist ausdrücklich darauf hin, dass Xbox / PlayStation diesen zusätzlichen Einlöseschritt benötigen; PC / Switch / Mobilgeräte in der Regel nicht.

## Creator-Codes (Support-A-Creator) — wie sie wirklich funktionieren

Ein Creator-Code schaltet **keine** Skins frei und fügt keine V-Bucks hinzu. Er teilt Epic mit, welcher Creator einen Anteil an den **berechtigten** Käufen erhalten soll, die du machst, während der Code aktiv ist.

### So gibst du einen Creator-Code ein

1. Starte Fortnite und öffne den **Item Shop**.
2. Finde **Enter Code** / Support-A-Creator (der Wortlaut variiert je nach Patch leicht).
3. Gib den Code des Creators exakt ein (oft der Streamer-Name oder ein kurzer Tag).
4. Bestätige. Du solltest sehen, dass der Creator-Name für ein begrenztes Zeitfenster übernommen wurde (Epic ändert, wie lange ein Code "hält" — gib ihn vor größeren Käufen im Zweifel erneut ein).
5. Kaufe Battle Pass, V-Bucks-Pakete (wenn berechtigt), Crew oder Shop-Kosmetik wie gewohnt.

### Creator-Code-FAQ, die Spieler oft falsch verstehen

- **Es ist kein Rabattcode.** Der Preis bleibt gleich.
- **Es ist nicht die PIN einer V-Bucks-Karte.** Ein anderes System.
- **Verschenken / manche SKUs können nicht berechtigt sein**, abhängig von Epics aktuellen SAC-Regeln — wenn der Code nicht angewendet wird, kann der Kauf trotzdem erfolgreich sein, ohne dass jemand unterstützt wird.
- **Du kannst Codes wechseln**, bevor du zur Kasse gehst; normalerweise gilt der zuletzt bestätigte Code für diese Sitzung/Zeitfenster.
- Phishing-Seiten, die dich bitten, den "Creator-Code mit deinem Passwort zu verifizieren", sind Betrug — nutze nur das Feld im Ingame-Shop oder Epics offizielle Seiten.

## Epic Games Store-Keys vs. Fortnite-V-Bucks-Karten

Manche physischen "Fortnite"-Produkte oder Epic-Wallet-Karten werden auf den Store-Einlöseseiten von **epicgames.com** eingelöst, statt auf fortnite.com/vbuckscard. Wenn auf der Verpackung **Epic Games Store** / Wallet-Guthaben steht, folge der auf der Karte aufgedruckten Epic-Einlöse-URL — erzwinge es nicht über die V-Bucks-Karten-Seite.

## Häufige Einlösefehler und Lösungen

| Problem | Wahrscheinliche Ursache | Lösung |
| --- | --- | --- |
| "Ungültiger Code" | Tippfehler, bereits verwendet, falscher Produkttyp | PIN erneut prüfen; nicht wiederverwenden; bestätigen, dass es eine V-Bucks-Karte und kein Creator-Tag ist |
| Plattform fehlt in der Liste | Konsole nicht mit diesem Epic-Account verknüpft | Konsole unter Epic-Account → Verbindungen verknüpfen, dann erneut versuchen |
| Guthaben fehlt bei PS/Xbox | Zusätzlicher Code nie eingelöst | E-Mail / Epic-Bestätigung für den zweiten Code prüfen; auf dem richtigen Sony-/Microsoft-Account einlösen |
| V-Bucks im "falschen" Locker | Beim falschen Epic-Account angemeldet | Sofort stoppen; Epic mit Kaufbeleg kontaktieren — vorbeugen durch Locker-Check *vor* Confirm |
| Karte zeigt regionale Sperre | Regionale SKU-Beschränkungen | Von einem Store/Account einlösen, der den Regionsregeln der Karte entspricht |
| Kinder-Account / Kindersicherung | Kaufbeschränkungen | Erziehungsberechtigte müssen die Einlöseschritte im Konsolen-Store abschließen |

## Sicherheitscheckliste (Betrug vermeiden)

- Löse nur auf **fortnite.com** / **epicgames.com** / offiziellen Konsolen-Stores ein
- Sende niemals eine PIN an "Support" per Discord, Instagram-DMs oder "Gewinnspiel-Hosts"
- Poste niemals einen Screenshot einer vollständigen, ungenutzten PIN öffentlich
- Wenn eine Seite außerhalb von Epics Login sowohl dein Passwort **als auch** die Karten-PIN verlangt, verlasse die Seite
- Nach dem Einlösen kannst du mit dem [V-Bucks-Rechner](/tools/vbucks-calculator) planen und vor Impulskäufen den [Item Shop](/tools/item-shop) prüfen

## FAQ

### Kann ich eine V-Bucks-Karte innerhalb von Fortnite einlösen?

Nicht als primären Weg. Starte auf [fortnite.com/vbuckscard](https://www.fortnite.com/vbuckscard). Konsolenspieler schließen den Vorgang dann bei Aufforderung im PlayStation Store / Microsoft Store ab.

### Werden V-Bucks zwischen PC und Konsole übertragen?

V-Bucks folgen Epics Plattform-Wallet-Regeln und der Art, wie du sie eingelöst hast. Cross-Progression-Kosmetik liegt auf dem Epic-Account, aber Ausgabeguthaben können plattformgetrennt sein — löse gezielt für das Gerät ein, auf dem du einkaufst, und lies Epics Guthabenvorschau auf dem Bildschirm, bevor du auf Confirm klickst.

### Kann ich eine eingelöste Karte erstatten lassen?

In der Regel nicht, sobald sie eingelöst wurde. Bewahre den Kaufbeleg für den Epic Support auf, falls die PIN fehlschlägt oder falsch gutgeschrieben wird. Kosmetik-Reue nach dem Ausgeben von V-Bucks ist ein anderes Thema — [Rückerstattungs-Guide](/guides/how-to/how-to-refund-fortnite-skins).

### Wie unterstütze ich einen Creator, ohne etwas zu kaufen?

Nur einen Code einzugeben, bewirkt nichts, bis du einen berechtigten Kauf tätigst. Merke dir Wünsche mit dem [Item-Shop-Tracker](/tools/item-shop) vor und kaufe, wenn du bereit bist.`,
    },
  },
  fr: {
    hub: {
      metaTitle: 'Guides Fortnite',
      metaDescription:
        "Comment obtenir un remboursement pour des skins Fortnite et échanger des codes V-Bucks / créateur — guides pratiques de compte Epic sur FortniteTools.",
      eyebrow: 'Guides',
      title: 'Guides Fortnite',
      description:
        'Guides pratiques pour les remboursements, les codes et les actions de compte. Les guides de méta de saison restent sur les outils en anglais et la carte interactive.',
      all: 'Tous',
      howTo: 'Tutoriels',
      categoryEyebrow: 'Catégorie',
      categoryTitle: 'Guides pratiques Fortnite',
      categoryDescription: 'Compte, remboursements, codes et guides pratiques',
      minRead: '{minutes} min de lecture',
      home: 'Accueil',
      related: 'Vous aimerez aussi',
      browseCategories: 'Parcourir les catégories',
      previous: 'Précédent',
      next: 'Suivant',
      comingSoon: 'Article complet à venir bientôt. Revenez plus tard !',
    },
    refund: {
      metaTitle: "Comment rembourser des skins et achats de l'Item Shop Fortnite",
      metaDescription:
        "Règles officielles de remboursement Epic : Cancel Purchase sous 24 heures, Return Tickets sous 30 jours, ce qui n'est pas remboursable et comment récupérer vos V-Bucks.",
      title: "Comment rembourser des skins et achats de l'Item Shop Fortnite",
      excerpt:
        "Règles officielles de remboursement Epic : Cancel Purchase sous 24 heures, Return Tickets sous 30 jours, ce qui n'est pas remboursable et comment récupérer vos V-Bucks.",
      content: `## Deux outils officiels : Cancel Purchase et Return Tickets

Epic vous permet d'annuler de nombreux **achats cosmétiques de l'Item Shop effectués avec des V-Bucks** sans contacter le support — si vous agissez dans les délais et que l'article est éligible.

Ce guide suit l'aide officielle d'Epic sur la facturation de Fortnite Battle Royale concernant l'annulation ou le remboursement d'achats de l'Item Shop effectués avec des V-Bucks. Les règles peuvent être mises à jour ; si l'interface du jeu contredit cette page, faites confiance au jeu et à l'aide Epic.

Dernière révision : août 2026. Lectures associées : le [suivi de l'Item Shop](/tools/item-shop) et [comment échanger un code Fortnite](/guides/how-to/how-to-redeem-fortnite-code).

## Comparaison rapide

| Outil | Fenêtre de temps | Limite supplémentaire | Idéal pour |
| --- | --- | --- | --- |
| **Cancel Purchase** | Dans les **24 heures** suivant l'achat | L'article doit être **non utilisé / non équipé** dans tous les modes | Achat accidentel le jour même |
| **Return Ticket** | Article acheté dans les **30 derniers jours** | Les tickets sont limités (voir ci-dessous) | Erreurs remarquées après 24 heures |
| **Demande de remboursement en argent réel** | Processus de remboursement Epic distinct | Pour les achats en argent réel de packs de V-Bucks, pas tous les cosmétiques | Vous avez acheté le mauvais pack de V-Bucks avec de l'argent |

Les achats effectués dans des **îles Creative créées par des développeurs** ne peuvent pas utiliser Cancel Purchase ni les Return Tickets.

## Ce que vous ne pouvez généralement pas rembourser avec Cancel Purchase / Return Tickets

L'article d'aide d'Epic liste des catégories non remboursables via ces outils, notamment :

- Battle Pass / pass Festival et autres pass
- Niveaux de pass et parcours de récompenses premium
- **Bundles** cosmétiques (les Return Tickets peuvent exiger de rendre tout le bundle éligible ensemble lorsque les bundles sont autorisés — suivez l'invite du jeu)
- Achats **offerts**
- Level Up Quest Packs
- Loot Llamas de Save the World / certains articles de la boutique STW
- Achats sur des îles de développeurs

Si vous regrettez un Battle Pass, les outils de remboursement cosmétique d'Epic ne l'annuleront pas. Dépensez vos V-Bucks avec prudence grâce au [calculateur de V-Bucks](/tools/vbucks-calculator) avant de confirmer.

## Comment utiliser Cancel Purchase (annulation en 24 heures)

Utilisez ceci lorsque vous avez acheté la mauvaise tenue il y a quelques minutes et que vous ne l'avez jamais équipée.

1. Lancez Fortnite et ouvrez votre **Locker** / l'historique d'achat de l'article (les libellés peuvent afficher **Cancel Purchase** dans les détails de l'article).
2. Sélectionnez l'article que vous venez d'acheter.
3. Choisissez **Cancel Purchase** si le bouton est disponible.
4. Confirmez. Le cosmétique est retiré et les V-Bucks reviennent sur votre solde.

### Cancel Purchase échoue lorsque

- Plus de 24 heures se sont écoulées
- Vous avez équipé ou utilisé l'article dans un mode quelconque (y compris Creative / Festival / LEGO le cas échéant)
- Le type d'article figure sur la liste des non-remboursables
- Vous avez déjà annulé cet achat une fois (Epic précise que chaque article ne peut être annulé qu'une seule fois ; le racheter peut afficher un rappel)

## Comment utiliser un Return Ticket (fenêtre de 30 jours)

Si Cancel Purchase n'est plus disponible, vérifiez si vous avez un **Return Ticket**.

Règles de tickets publiées par Epic (vérifiez sur votre compte — Epic a ajusté les attributions au fil des années) :

- Les comptes sont fournis avec des Return Tickets (généralement décrits comme démarrant avec **3**)
- Vous recevez généralement **1 nouveau ticket tous les 365 jours**
- Vous pouvez en détenir un maximum limité à la fois (généralement **3**)

### Étapes

1. Ouvrez l'article dans votre locker / l'interface de remboursement.
2. Choisissez l'option Return Ticket lorsqu'elle est proposée.
3. Confirmez. Les V-Bucks reviennent et l'article quitte votre compte.
4. Pour les bundles éligibles, rendez l'ensemble complet lorsque l'interface l'exige.

Les Return Tickets sont précieux. N'en utilisez pas un pour un spray à 200 V-Bucks si vous risquez de cliquer par erreur plus tard sur une tenue à 2 000 V-Bucks.

## Achats en argent réel (packs de V-Bucks, Crew, etc.)

Si vous avez dépensé de **l'argent réel** pour des packs de V-Bucks ou des abonnements et avez besoin d'un remboursement en espèces, utilisez le processus de **demande de remboursement** d'Epic sur le site web d'Epic Games — pas le bouton Return Ticket dans le jeu. Les boutiques de plateforme (PlayStation, Xbox, Nintendo) peuvent aussi exiger des remboursements via Sony / Microsoft / Nintendo plutôt qu'Epic, selon l'endroit où vous avez payé.

## Tenues offertes

Les cadeaux sont généralement **non remboursables** via Cancel Purchase / Return Tickets. Si vous avez été arnaqué lors d'un échange de cadeau, il s'agit d'un problème de sécurité de compte — activez la 2FA d'Epic sur [epicgames.com/account/password](https://www.epicgames.com/account/password) et contactez le support Epic avec les détails de la commande. N'utilisez pas de prêteurs de compte pour tenter de « forcer un remboursement ».

## Bonnes habitudes pour moins avoir besoin de remboursement

- Prévisualisez les styles dans la boutique avant d'acheter
- Vérifiez les pièces d'un set sur le [suivi de l'Item Shop](/tools/item-shop)
- Évitez d'acheter sous la pression d'overlays de stream ou d'amis qui insistent pour que vous achetiez
- Gardez au moins un Return Ticket en réserve
- N'équipez jamais un achat douteux avant d'être sûr — l'équiper peut annuler l'éligibilité à Cancel Purchase

## FAQ

### Les V-Bucks remboursés reviennent-ils instantanément ?

Généralement oui, à l'écran après confirmation. Redémarrez le client si l'interface du solde est en retard.

### Puis-je rembourser une tenue de la saison dernière ?

Seulement si elle est encore dans la fenêtre d'achat de **30 jours** du Return Ticket et éligible. Les articles plus anciens du locker hors de cette fenêtre restent sur le compte.

### Le remboursement affecte-t-il l'état de mon compte ?

Utiliser les outils officiels Cancel Purchase / Return Ticket comme prévu est normal. Les rétrofacturations (chargebacks) sur des achats en argent réel peuvent bloquer les achats et risquer une action sur le compte — utilisez d'abord la demande de remboursement officielle d'Epic plutôt que de contester directement auprès de votre banque.`,
    },
    redeem: {
      metaTitle: 'Comment échanger un code Fortnite (cartes V-Bucks + codes créateur)',
      metaDescription:
        'Échangez des cartes-cadeaux V-Bucks sur PC, Switch, PlayStation et Xbox — et découvrez comment fonctionnent les codes Support-A-Creator dans l\'Item Shop, en évitant les erreurs de mauvais compte.',
      title: 'Comment échanger un code Fortnite (cartes V-Bucks + codes créateur)',
      excerpt:
        'Échangez des cartes-cadeaux V-Bucks sur PC, Switch, PlayStation et Xbox — et découvrez comment fonctionnent les codes Support-A-Creator dans l\'Item Shop, en évitant les erreurs de mauvais compte.',
      content: `## Deux « codes Fortnite » différents (à ne pas confondre)

Les joueurs recherchent « échanger un code Fortnite » pour deux systèmes totalement différents :

| Type de code | Ce qu'il fait | Où l'entrer |
| --- | --- | --- |
| **PIN de carte-cadeau V-Bucks / Fortnite** | Ajoute des V-Bucks prépayés à un compte Epic (les règles de plateforme s'appliquent) | Le site officiel [V-Bucks Card](https://www.fortnite.com/vbuckscard) — **pas** la barre de recherche de l'Item Shop dans le jeu |
| **Code Support-A-Creator / créateur** | Reverse à un créateur une part des achats éligibles ; ne donne **pas** de V-Bucks gratuits | Fortnite **Item Shop → Enter Code** (ou le champ de code créateur au paiement) |

Si vous avez acheté une carte physique et essayez de saisir le PIN comme code créateur, cela échouera. Si vous saisissez le tag créateur d'un streamer sur le site de la carte V-Bucks, cela échouera aussi.

Dernière révision : 1er août 2026. Aide officielle sur la carte V-Bucks : [Comment échanger une carte V-Bucks](https://www.epicgames.com/help/en-US/c-Category_Fortnite/c-Fortnite_Billingandpayment/how-to-redeem-a-v-bucks-card-a000084845). Conservez votre reçu jusqu'à ce que le solde s'affiche correctement.

À lire aussi : [remboursements](/guides/how-to/how-to-refund-fortnite-skins), [calculateur de V-Bucks](/tools/vbucks-calculator), [Item Shop](/tools/item-shop).

## Avant d'échanger quoi que ce soit

1. Connectez-vous au **compte Epic propriétaire de votre locker** — vérifiez vos tenues sur [epicgames.com/account](https://www.epicgames.com/account) avant de coller un PIN.
2. Vérifiez que le profil console / Microsoft / PlayStation que vous allez sélectionner est bien lié à cet identifiant Epic dans Compte → Connexions.
3. Activez la 2FA d'Epic sur [epicgames.com/account/password](https://www.epicgames.com/account/password) pour qu'un PC familial partagé ne brûle pas votre carte sur le mauvais compte.
4. Grattez le PIN avec soin ; n'achetez pas de « vérificateurs de code » ni de « bots d'échange » Discord.

## Comment échanger une carte V-Bucks (toutes les plateformes commencent ici)

Le processus d'Epic est principalement web. Vous ne pouvez généralement **pas** finaliser une carte V-Bucks physique en collant simplement le PIN dans le client Fortnite.

1. Ouvrez [fortnite.com/vbuckscard](https://www.fortnite.com/vbuckscard) dans un navigateur.
2. Cliquez sur **Get Started** et connectez-vous au bon compte Epic Games (utilisez les boutons de connexion console si c'est ainsi que vous vous authentifiez habituellement).
3. Entrez le PIN inscrit au dos de la carte / dans l'e-mail numérique — généralement **sans tirets**.
4. Cliquez sur **Next**.
5. Choisissez la **plateforme / l'appareil** sur lequel vous jouez à Fortnite. Seules les plateformes liées apparaissent — si la vôtre manque, corrigez d'abord vos Connexions.
6. Vérifiez le nom du compte Epic, l'appareil et le solde prévu, puis **Confirm**.

### PC, Nintendo Switch et mobile

Après Confirm, les V-Bucks sont généralement ajoutés au portefeuille Epic pour ce chemin de plateforme. Lancez Fortnite, ouvrez l'Item Shop et vérifiez le solde. Fermez et relancez le jeu une fois si l'interface est en retard.

### PlayStation (PS5 / PS4) — code secondaire requis

Sélectionner PlayStation génère un **code secondaire PlayStation Store** (Epic l'affiche et/ou l'envoie par e-mail). Vous devez échanger ce code sur le **compte Sony lié à votre compte Epic** :

1. Terminez l'étape Confirm de fortnite.com/vbuckscard avec **PlayStation** sélectionné.
2. Copiez le code secondaire fourni par Epic.
3. Échangez-le sur le PlayStation Store (console : Paramètres / PlayStation Store → Échanger des codes, ou la page web d'échange de Sony en étant connecté au bon compte PSN).
4. Utilisez une **fenêtre de navigation privée** si vous avez plusieurs comptes PSN — échanger sur le mauvais identifiant Sony est le cauchemar numéro un du support.
5. Relancez Fortnite sur ce compte PSN et vérifiez les V-Bucks.

### Xbox — code secondaire Microsoft requis

Même schéma en deux étapes que PlayStation :

1. Confirmez sur fortnite.com/vbuckscard avec **Xbox** sélectionné.
2. Copiez le code secondaire de type prépayé **Microsoft / Xbox** généré par Epic.
3. Échangez-le sur le compte Microsoft lié à votre compte Epic (interface d'échange de la console Xbox ou site d'échange Microsoft).
4. Relancez Fortnite et vérifiez le solde.

L'aide d'Epic précise explicitement que Xbox / PlayStation nécessitent cette étape d'échange secondaire ; PC / Switch / mobile généralement pas.

## Codes créateur (Support-A-Creator) — comment ça fonctionne vraiment

Un code créateur ne débloque **pas** de tenues et n'ajoute pas de V-Bucks. Il indique à Epic quel créateur doit recevoir une part des achats **éligibles** que vous effectuez tant que le code est actif.

### Comment entrer un code créateur

1. Lancez Fortnite et ouvrez l'**Item Shop**.
2. Trouvez **Enter Code** / Support-A-Creator (le libellé varie légèrement selon le patch).
3. Tapez le code du créateur exactement (souvent le nom du streamer ou un tag court).
4. Confirmez. Vous devriez voir le nom du créateur appliqué pendant une fenêtre limitée (Epic fait varier la durée pendant laquelle un code « colle » — ressaisissez-le avant un gros achat en cas de doute).
5. Achetez le Battle Pass, des packs de V-Bucks (si éligibles), le Crew ou des cosmétiques de la boutique comme d'habitude.

### FAQ sur les codes créateur souvent mal comprise

- **Ce n'est pas un coupon.** Le prix reste le même.
- **Ce n'est pas le PIN d'une carte V-Bucks.** Un système différent.
- **Les cadeaux / certains SKU peuvent être inéligibles** selon les règles SAC actuelles d'Epic — si le code ne s'applique pas, l'achat peut tout de même réussir sans soutenir personne.
- **Vous pouvez changer de code** avant le paiement ; c'est généralement le dernier code confirmé qui compte pour cette session/fenêtre.
- Les sites de phishing qui vous demandent de « vérifier le code créateur » avec votre mot de passe sont des arnaques — utilisez uniquement le champ de la boutique dans le jeu ou les pages officielles d'Epic.

## Clés Epic Games Store vs cartes V-Bucks Fortnite

Certains produits physiques « Fortnite » ou cartes de portefeuille Epic s'échangent sur les pages d'échange de la boutique **epicgames.com** plutôt que sur fortnite.com/vbuckscard. Si l'emballage indique **Epic Games Store** / crédit de portefeuille, suivez l'URL d'échange Epic imprimée sur la carte — ne forcez pas via le site de la carte V-Bucks.

## Erreurs d'échange courantes et solutions

| Problème | Cause probable | Solution |
| --- | --- | --- |
| « Code invalide » | Faute de frappe, déjà utilisé, mauvais type de produit | Revérifiez le PIN ; ne le réutilisez pas ; confirmez qu'il s'agit d'une carte V-Bucks et non d'un tag créateur |
| Plateforme manquante dans la liste | Console non liée à ce compte Epic | Liez la console dans Compte Epic → Connexions, puis réessayez |
| Solde manquant sur PS/Xbox | Code secondaire jamais échangé | Vérifiez l'e-mail / la confirmation Epic pour le second code ; échangez-le sur le bon identifiant Sony/Microsoft |
| V-Bucks sur le « mauvais » locker | Connecté au mauvais compte Epic | Arrêtez ; contactez Epic avec le reçu — évitez ce cas en vérifiant le locker *avant* Confirm |
| La carte indique un blocage régional | Limites de SKU régionales | Échangez depuis une boutique/un compte correspondant aux règles régionales de la carte |
| Compte enfant / contrôle parental | Restrictions d'achat | Le tuteur doit terminer les étapes d'échange dans la boutique de la console |

## Liste de sécurité (éviter les arnaques)

- Échangez uniquement sur **fortnite.com** / **epicgames.com** / les boutiques officielles des consoles
- N'envoyez jamais un PIN au « support » via Discord, messages privés Instagram ou « organisateurs de giveaway »
- Ne publiez jamais une capture d'écran d'un PIN complet non utilisé
- Si un site demande votre mot de passe **et** le PIN de la carte ensemble hors de la connexion Epic, partez
- Après l'échange, vous pouvez dépenser avec le [calculateur de V-Bucks](/tools/vbucks-calculator) et vérifier l'[Item Shop](/tools/item-shop) avant tout achat impulsif

## FAQ

### Puis-je échanger une carte V-Bucks directement dans Fortnite ?

Pas comme processus principal. Commencez sur [fortnite.com/vbuckscard](https://www.fortnite.com/vbuckscard). Les joueurs console terminent ensuite sur le PlayStation Store / Microsoft Store lorsque demandé.

### Les V-Bucks se transfèrent-ils entre PC et console ?

Les V-Bucks suivent les règles de portefeuille de plateforme d'Epic et la manière dont vous les avez échangés. Les cosmétiques en progression croisée résident sur le compte Epic, mais les soldes dépensables peuvent être séparés par plateforme — échangez intentionnellement pour l'appareil sur lequel vous achetez, et lisez l'aperçu du solde à l'écran d'Epic avant de cliquer sur Confirm.

### Puis-je me faire rembourser une carte déjà échangée ?

Généralement non, une fois échangée. Conservez le reçu pour le support Epic si le PIN échoue ou s'enregistre incorrectement. Le regret cosmétique après avoir dépensé des V-Bucks est un autre outil — [guide des remboursements](/guides/how-to/how-to-refund-fortnite-skins).

### Comment soutenir un créateur sans rien acheter ?

Entrer un code seul ne fait rien tant que vous n'effectuez pas d'achat éligible. Ajoutez à votre liste de souhaits avec le [suivi de l'Item Shop](/tools/item-shop), puis achetez quand vous êtes prêt.`,
    },
  },
  pl: {
    hub: {
      metaTitle: 'Poradniki Fortnite',
      metaDescription:
        'Jak zwrócić skiny Fortnite i wykorzystać kody V-Bucks / kody twórców — praktyczne poradniki konta Epic na FortniteTools.',
      eyebrow: 'Poradniki',
      title: 'Poradniki Fortnite',
      description:
        'Praktyczne poradniki dotyczące zwrotów, kodów i działań na koncie. Poradniki dotyczące mety sezonu pozostają w angielskich narzędziach i na interaktywnej mapie.',
      all: 'Wszystkie',
      howTo: 'Jak to zrobić',
      categoryEyebrow: 'Kategoria',
      categoryTitle: 'Praktyczne poradniki Fortnite',
      categoryDescription: 'Konto, zwroty, kody i praktyczne poradniki',
      minRead: '{minutes} min czytania',
      home: 'Strona główna',
      related: 'Może Cię również zainteresować',
      browseCategories: 'Przeglądaj kategorie',
      previous: 'Poprzedni',
      next: 'Następny',
      comingSoon: 'Pełny artykuł wkrótce. Zajrzyj tu ponownie!',
    },
    refund: {
      metaTitle: 'Jak zwrócić skiny i zakupy z Item Shopu Fortnite',
      metaDescription:
        'Oficjalne zasady zwrotów Epic: Cancel Purchase w ciągu 24 godzin, Return Tickets w ciągu 30 dni, co nie podlega zwrotowi i jak odzyskać V-Bucks.',
      title: 'Jak zwrócić skiny i zakupy z Item Shopu Fortnite',
      excerpt:
        'Oficjalne zasady zwrotów Epic: Cancel Purchase w ciągu 24 godzin, Return Tickets w ciągu 30 dni, co nie podlega zwrotowi i jak odzyskać V-Bucks.',
      content: `## Dwa oficjalne narzędzia: Cancel Purchase i Return Tickets

Epic pozwala odwrócić wiele **zakupów kosmetyków w Item Shopie za V-Bucks** bez kontaktowania się z pomocą techniczną — jeśli działasz w wyznaczonych oknach czasowych i przedmiot się kwalifikuje.

Ten poradnik opiera się na oficjalnej pomocy Epic dotyczącej rozliczeń w Fortnite Battle Royale w zakresie anulowania lub zwrotu zakupów w Item Shopie dokonanych za V-Bucks. Zasady mogą się zmieniać; jeśli interfejs w grze różni się od tej strony, ufaj grze i pomocy Epic.

Ostatnia aktualizacja: sierpień 2026. Powiązane materiały: [tracker Item Shopu](/tools/item-shop) oraz [jak wykorzystać kod Fortnite](/guides/how-to/how-to-redeem-fortnite-code).

## Szybkie porównanie

| Narzędzie | Okno czasowe | Dodatkowe ograniczenie | Najlepsze dla |
| --- | --- | --- | --- |
| **Cancel Purchase** | W ciągu **24 godzin** od zakupu | Przedmiot musi być **nieużywany / niezałożony** w każdym trybie | Przypadkowy zakup tego samego dnia |
| **Return Ticket** | Przedmiot kupiony w ciągu ostatnich **30 dni** | Bilety są limitowane (patrz poniżej) | Błędy zauważone po 24 godzinach |
| **Wniosek o zwrot pieniędzy realnych** | Osobny proces zwrotu Epic | Dla zakupów pakietów V-Bucks za prawdziwe pieniądze, nie każdy kosmetyk | Kupiłeś złą paczkę V-Bucks za prawdziwe pieniądze |

Zakupy dokonane wewnątrz **wysp Creative stworzonych przez deweloperów** nie mogą korzystać z Cancel Purchase ani Return Tickets.

## Czego zwykle nie można zwrócić przez Cancel Purchase / Return Tickets

Artykuł pomocy Epic wymienia kategorie niepodlegające zwrotowi przez te narzędzia, w tym:

- Battle Passy / Festival i inne przepustki
- Poziomy przepustki i premium ścieżki nagród
- **Bundle** kosmetyków (Return Tickets mogą wymagać zwrotu całego kwalifikującego się bundle razem, gdy bundle są dozwolone — postępuj według monitu w grze)
- **Podarowane** zakupy
- Level Up Quest Packs
- Loot Llamy z Save the World / niektóre przedmioty w sklepie STW
- Zakupy na wyspach deweloperów

Jeśli żałujesz zakupu Battle Passa, narzędzia zwrotu kosmetyków Epic go nie odwrócą. Wydawaj V-Bucks rozważnie, korzystając z [kalkulatora V-Bucks](/tools/vbucks-calculator) przed potwierdzeniem.

## Jak użyć Cancel Purchase (anulowanie w ciągu 24 godzin)

Użyj tego, gdy kilka minut temu kupiłeś nie ten skin i nigdy go nie założyłeś.

1. Uruchom Fortnite i otwórz swój **Locker** / wpis historii zakupów danego przedmiotu (etykiety ścieżki mogą wskazywać **Cancel Purchase** w szczegółach przedmiotu).
2. Wybierz przedmiot, który właśnie kupiłeś.
3. Wybierz **Cancel Purchase**, jeśli przycisk jest dostępny.
4. Potwierdź. Kosmetyk zostaje usunięty, a V-Bucks wracają do Twojego salda.

### Cancel Purchase nie działa, gdy

- Minęło więcej niż 24 godziny
- Założyłeś lub użyłeś przedmiotu w jakimkolwiek trybie (w tym Creative / Festival / LEGO, gdy dotyczy)
- Typ przedmiotu jest na liście niepodlegających zwrotowi
- Już raz anulowałeś ten zakup (Epic zauważa, że każdy przedmiot można anulować tylko raz; ponowny zakup może wyświetlić przypomnienie)

## Jak użyć Return Ticket (okno 30 dni)

Jeśli Cancel Purchase już nie jest dostępne, sprawdź, czy masz **Return Ticket**.

Opublikowane przez Epic zasady dotyczące biletów (zweryfikuj na swoim koncie — Epic zmieniał przydziały na przestrzeni lat):

- Konta są wyposażane w Return Tickets (zwykle opisywane jako zaczynające się od **3**)
- Zazwyczaj otrzymujesz **1 nowy bilet co 365 dni**
- Możesz posiadać ograniczoną liczbę maksymalnie na raz (zwykle **3**)

### Kroki

1. Otwórz przedmiot w swoim Lockerze / interfejsie zwrotu.
2. Wybierz opcję Return Ticket, gdy jest dostępna.
3. Potwierdź. V-Bucks wracają, a przedmiot znika z Twojego konta.
4. W przypadku kwalifikujących się bundle zwróć cały zestaw razem, gdy interfejs tego wymaga.

Return Tickets są cenne. Nie wykorzystuj biletu na spray za 200 V-Bucks, jeśli później mógłbyś przypadkowo kliknąć strój za 2000 V-Bucks.

## Zakupy za prawdziwe pieniądze (paczki V-Bucks, Crew itd.)

Jeśli wydałeś **prawdziwe pieniądze** na paczki V-Bucks lub subskrypcje i potrzebujesz zwrotu pieniędzy, użyj procesu **wniosku o zwrot** Epic na stronie internetowej Epic Games — nie przycisku Return Ticket w grze. Sklepy platform (PlayStation, Xbox, Nintendo) mogą również wymagać zwrotów przez Sony / Microsoft / Nintendo, a nie Epic, w zależności od tego, gdzie zapłaciłeś.

## Podarowane skiny

Prezenty zazwyczaj **nie podlegają zwrotowi** przez Cancel Purchase / Return Tickets. Jeśli zostałeś oszukany podczas wymiany prezentów, jest to problem bezpieczeństwa konta — włącz 2FA Epic na [epicgames.com/account/password](https://www.epicgames.com/account/password) i skontaktuj się z pomocą Epic, podając szczegóły zamówienia. Nie korzystaj z "wypożyczalni kont", aby próbować "wymusić zwrot".

## Dobre zwyczaje, które ograniczą liczbę zwrotów

- Przeglądaj stylizacje w sklepie przed zakupem
- Sprawdzaj elementy zestawu w [trackerze Item Shopu](/tools/item-shop)
- Unikaj kupowania pod presją nakładek na streamie lub znajomych naciskających "kup to"
- Zachowaj co najmniej jeden Return Ticket w zapasie
- Nigdy nie zakładaj podejrzanego zakupu, dopóki nie jesteś pewien — założenie może zablokować możliwość Cancel Purchase

## FAQ

### Czy zwrócone V-Bucks wracają natychmiast?

Zwykle tak, widoczne na ekranie po potwierdzeniu. Uruchom ponownie klienta, jeśli interfejs salda się zawiesza.

### Czy mogę zwrócić skina z zeszłego sezonu?

Tylko jeśli wciąż znajduje się w **30-dniowym** oknie zakupu Return Ticket i się kwalifikuje. Starsze przedmioty w Lockerze poza tym oknem pozostają na koncie.

### Czy zwrot wpływa na status mojego konta?

Korzystanie z oficjalnych narzędzi Cancel Purchase / Return Ticket zgodnie z ich przeznaczeniem jest normalne. Chargebacki przy zakupach za prawdziwe pieniądze mogą blokować zakupy i wiązać się z ryzykiem działań na koncie — najpierw skorzystaj z oficjalnego wniosku o zwrot Epic, zamiast kwestionować transakcję w banku.`,
    },
    redeem: {
      metaTitle: 'Jak wykorzystać kod Fortnite (karty V-Bucks + kody twórców)',
      metaDescription:
        'Wykorzystaj karty podarunkowe V-Bucks na PC, Switch, PlayStation i Xbox — oraz jak działają kody Support-A-Creator w Item Shopie i jak unikać błędów ze złym kontem.',
      title: 'Jak wykorzystać kod Fortnite (karty V-Bucks + kody twórców)',
      excerpt:
        'Wykorzystaj karty podarunkowe V-Bucks na PC, Switch, PlayStation i Xbox — oraz jak działają kody Support-A-Creator w Item Shopie i jak unikać błędów ze złym kontem.',
      content: `## Dwa różne "kody Fortnite" (nie mylić)

Gracze szukają "wykorzystaj kod Fortnite" dla dwóch zupełnie różnych systemów:

| Typ kodu | Co robi | Gdzie go wpisać |
| --- | --- | --- |
| **PIN karty podarunkowej V-Bucks / Fortnite** | Dodaje przedpłacone V-Bucks do konta Epic (obowiązują zasady platformy) | Oficjalna strona [V-Bucks Card](https://www.fortnite.com/vbuckscard) — **nie** pole wyszukiwania w Item Shopie w grze |
| **Kod Support-A-Creator / twórcy** | Przekazuje twórcy część z kwalifikujących się zakupów; **nie** daje darmowych V-Bucks | Fortnite **Item Shop → Enter Code** (lub pole kodu twórcy przy kasie) |

Jeśli kupiłeś fizyczną kartę i próbujesz wpisać PIN jako kod twórcy, to się nie powiedzie. Jeśli wpiszesz tag twórcy streamera na stronie karty V-Bucks, to również się nie powiedzie.

Ostatnia aktualizacja: 1 sierpnia 2026. Oficjalna pomoc dotycząca karty V-Bucks: [Jak wykorzystać kartę V-Bucks](https://www.epicgames.com/help/en-US/c-Category_Fortnite/c-Fortnite_Billingandpayment/how-to-redeem-a-v-bucks-card-a000084845). Zachowaj potwierdzenie zakupu, dopóki saldo nie wyświetli się poprawnie.

Powiązane: [zwroty](/guides/how-to/how-to-refund-fortnite-skins), [kalkulator V-Bucks](/tools/vbucks-calculator), [Item Shop](/tools/item-shop).

## Zanim wykorzystasz jakikolwiek kod

1. Zaloguj się na **konto Epic, do którego należy Twój Locker** — sprawdź skiny na [epicgames.com/account](https://www.epicgames.com/account), zanim wklejesz PIN.
2. Sprawdź, czy profil konsoli / Microsoft / PlayStation, który wybierzesz, jest powiązany z tym kontem Epic w Konto → Połączenia.
3. Włącz 2FA Epic na [epicgames.com/account/password](https://www.epicgames.com/account/password), aby współdzielony rodzinny komputer nie wykorzystał Twojej karty na złym koncie.
4. Zdrapuj PIN uważnie; nie kupuj "sprawdzaczy kodów" ani "botów wykorzystujących kody" z Discorda.

## Jak wykorzystać kartę V-Bucks (wszystkie platformy zaczynają tutaj)

Proces Epic jest głównie oparty na sieci. Zazwyczaj **nie możesz** dokończyć fizycznej karty V-Bucks, wklejając PIN tylko w kliencie Fortnite.

1. Otwórz [fortnite.com/vbuckscard](https://www.fortnite.com/vbuckscard) w przeglądarce.
2. Kliknij **Get Started** i zaloguj się na właściwe konto Epic Games (użyj przycisków logowania konsoli, jeśli tak zwykle się autoryzujesz).
3. Wpisz PIN z odwrotu karty / cyfrowego e-maila — zwykle **bez myślników**.
4. Kliknij **Next**.
5. Wybierz **platformę / urządzenie**, na którym grasz w Fortnite. Wyświetlają się tylko powiązane platformy — jeśli Twojej brakuje, najpierw napraw Połączenia.
6. Sprawdź nazwę konta Epic, urządzenie i przewidywane saldo, następnie kliknij **Confirm**.

### PC, Nintendo Switch i urządzenia mobilne

Po Confirm V-Bucks zwykle trafiają do portfela Epic dla tej ścieżki platformy. Uruchom Fortnite, otwórz Item Shop i sprawdź saldo. Wyłącz i uruchom ponownie grę, jeśli interfejs się zawiesza.

### PlayStation (PS5 / PS4) — wymagany dodatkowy kod

Wybranie PlayStation generuje **dodatkowy kod PlayStation Store** (Epic go wyświetla i/lub wysyła e-mailem). Musisz wykorzystać ten kod na **koncie Sony powiązanym z Twoim kontem Epic**:

1. Zakończ krok Confirm na fortnite.com/vbuckscard z wybraną opcją **PlayStation**.
2. Skopiuj dodatkowy kod udostępniony przez Epic.
3. Wykorzystaj go w PlayStation Store (konsola: Ustawienia / PlayStation Store → Wykorzystaj kody, lub strona internetowa Sony do wykorzystywania kodów, będąc zalogowanym na właściwe konto PSN).
4. Użyj **okna incognito**, jeśli masz wiele logowań PSN — wykorzystanie kodu na złym koncie Sony to najczęstszy koszmar wsparcia technicznego.
5. Uruchom ponownie Fortnite na tym koncie PSN i sprawdź V-Bucks.

### Xbox — wymagany dodatkowy kod Microsoft

Ten sam dwuetapowy schemat co PlayStation:

1. Potwierdź na fortnite.com/vbuckscard z wybraną opcją **Xbox**.
2. Skopiuj dodatkowy kod typu przedpłaconego **Microsoft / Xbox** wygenerowany przez Epic.
3. Wykorzystaj go na koncie Microsoft powiązanym z Twoim kontem Epic (interfejs wykorzystywania kodów konsoli Xbox lub strona Microsoft do wykorzystywania kodów).
4. Uruchom ponownie Fortnite i sprawdź saldo.

Pomoc Epic wyraźnie zaznacza, że Xbox / PlayStation wymagają tego dodatkowego kroku wykorzystania kodu; PC / Switch / urządzenia mobilne zwykle nie.

## Kody twórców (Support-A-Creator) — jak faktycznie działają

Kod twórcy **nie** odblokowuje skinów i nie dodaje V-Bucks. Informuje Epic, który twórca powinien otrzymać część z **kwalifikujących się** zakupów dokonanych przez Ciebie, gdy kod jest aktywny.

### Jak wpisać kod twórcy

1. Uruchom Fortnite i otwórz **Item Shop**.
2. Znajdź **Enter Code** / Support-A-Creator (nazewnictwo różni się nieco w zależności od patcha).
3. Wpisz kod twórcy dokładnie (często nazwa streamera lub krótki tag).
4. Potwierdź. Powinieneś zobaczyć nazwę twórcy zastosowaną na ograniczony czas (Epic zmienia, jak długo kod "trzyma się" — wpisz go ponownie przed większymi zakupami, jeśli masz wątpliwości).
5. Kup Battle Passa, paczki V-Bucks (jeśli kwalifikujące się), Crew lub kosmetyki ze sklepu jak zwykle.

### FAQ o kodach twórców, które gracze często rozumieją źle

- **To nie jest kupon.** Cena pozostaje taka sama.
- **To nie jest PIN karty V-Bucks.** Inny system.
- **Prezenty / niektóre SKU mogą się nie kwalifikować** w zależności od aktualnych zasad SAC Epic — jeśli kod się nie zastosuje, zakup może i tak się powiedzie, bez wsparcia dla kogokolwiek.
- **Możesz zmieniać kody** przed zakupem; zwykle liczy się ostatnio potwierdzony kod w danej sesji/oknie.
- Strony phishingowe proszące o "zweryfikowanie kodu twórcy" wraz z hasłem to oszustwa — używaj tylko pola w sklepie w grze lub oficjalnych stron Epic.

## Klucze Epic Games Store a karty V-Bucks Fortnite

Niektóre fizyczne produkty "Fortnite" lub karty portfela Epic wykorzystuje się na stronach wykorzystywania kodów sklepu **epicgames.com**, a nie na fortnite.com/vbuckscard. Jeśli opakowanie wskazuje **Epic Games Store** / środki portfela, postępuj według adresu URL wykorzystywania kodów Epic wydrukowanego na karcie — nie wymuszaj tego przez stronę karty V-Bucks.

## Częste błędy przy wykorzystywaniu kodów i rozwiązania

| Problem | Prawdopodobna przyczyna | Rozwiązanie |
| --- | --- | --- |
| "Nieprawidłowy kod" | Literówka, już wykorzystany, złego typu produkt | Sprawdź ponownie PIN; nie używaj go ponownie; potwierdź, że to karta V-Bucks, a nie tag twórcy |
| Brak platformy na liście | Konsola niepowiązana z tym kontem Epic | Powiąż konsolę w Konto Epic → Połączenia, następnie spróbuj ponownie |
| Brak salda na PS/Xbox | Dodatkowy kod nigdy niewykorzystany | Sprawdź e-mail / potwierdzenie Epic dotyczące drugiego kodu; wykorzystaj go na właściwym koncie Sony/Microsoft |
| V-Bucks na "złym" Lockerze | Zalogowano na złe konto Epic | Zatrzymaj się; skontaktuj się z Epic, podając potwierdzenie zakupu — zapobiegaj temu, sprawdzając Locker *przed* Confirm |
| Karta wskazuje blokadę regionalną | Ograniczenia SKU dla regionu | Wykorzystaj kod ze sklepu/konta zgodnego z zasadami regionalnymi karty |
| Konto dziecięce / kontrola rodzicielska | Ograniczenia zakupów | Opiekun musi dokończyć kroki wykorzystywania kodów w sklepie konsoli |

## Lista bezpieczeństwa (unikanie oszustw)

- Wykorzystuj kody tylko na **fortnite.com** / **epicgames.com** / oficjalnych sklepach konsol
- Nigdy nie wysyłaj PIN-u do "pomocy technicznej" przez Discord, DM na Instagramie ani "organizatorów giveaway"
- Nigdy nie publikuj publicznie zrzutu ekranu z pełnym, niewykorzystanym PIN-em
- Jeśli strona prosi o Twoje hasło **i** PIN karty razem poza logowaniem Epic, opuść tę stronę
- Po wykorzystaniu kodu możesz wydawać środki dzięki [kalkulatorowi V-Bucks](/tools/vbucks-calculator) i sprawdzić [Item Shop](/tools/item-shop) przed impulsywnymi zakupami

## FAQ

### Czy mogę wykorzystać kartę V-Bucks wewnątrz Fortnite?

Nie jako główny proces. Zacznij na [fortnite.com/vbuckscard](https://www.fortnite.com/vbuckscard). Gracze konsolowi dokańczają następnie proces w PlayStation Store / Microsoft Store, gdy zostaną o to poproszeni.

### Czy V-Bucks przenoszą się między PC a konsolą?

V-Bucks podlegają zasadom portfela platformy Epic oraz sposobowi, w jaki je wykorzystałeś. Kosmetyki z cross-progression znajdują się na koncie Epic, ale salda do wydania mogą być rozdzielone między platformy — wykorzystuj kody celowo dla urządzenia, na którym kupujesz, i przeczytaj podgląd salda na ekranie Epic przed kliknięciem Confirm.

### Czy mogę uzyskać zwrot za wykorzystaną kartę?

Zwykle nie, po wykorzystaniu. Zachowaj potwierdzenie zakupu dla pomocy Epic, jeśli PIN nie działa lub zostaje zaksięgowany nieprawidłowo. Żal po wydaniu V-Bucks na kosmetyk to inne narzędzie — [poradnik o zwrotach](/guides/how-to/how-to-refund-fortnite-skins).

### Jak wspierać twórcę bez kupowania czegokolwiek?

Samo wpisanie kodu nic nie robi, dopóki nie dokonasz kwalifikującego się zakupu. Dodaj do listy życzeń dzięki [trackerowi Item Shopu](/tools/item-shop), a kup, gdy będziesz gotowy.`,
    },
  },
  'pt-BR': {
    hub: {
      metaTitle: 'Guias de Fortnite',
      metaDescription:
        'Como reembolsar skins do Fortnite e resgatar V-Bucks / códigos de criador — guias práticos de conta Epic no FortniteTools.',
      eyebrow: 'Guias',
      title: 'Guias de Fortnite',
      description:
        'Guias práticos sobre reembolsos, códigos e ações de conta. Os guias de meta de temporada continuam nas ferramentas em inglês e no mapa interativo.',
      all: 'Todos',
      howTo: 'Como fazer',
      categoryEyebrow: 'Categoria',
      categoryTitle: 'Guias práticos de Fortnite',
      categoryDescription: 'Conta, reembolsos, códigos e guias práticos',
      minRead: '{minutes} min de leitura',
      home: 'Início',
      related: 'Você também pode gostar',
      browseCategories: 'Explorar categorias',
      previous: 'Anterior',
      next: 'Próximo',
      comingSoon: 'Artigo completo em breve. Volte em breve!',
    },
    refund: {
      metaTitle: 'Como reembolsar skins e compras do Item Shop do Fortnite',
      metaDescription:
        'Regras oficiais de reembolso da Epic: Cancel Purchase em 24 horas, Return Tickets em 30 dias, o que não pode ser reembolsado e como recuperar seus V-Bucks.',
      title: 'Como reembolsar skins e compras do Item Shop do Fortnite',
      excerpt:
        'Regras oficiais de reembolso da Epic: Cancel Purchase em 24 horas, Return Tickets em 30 dias, o que não pode ser reembolsado e como recuperar seus V-Bucks.',
      content: `## Duas ferramentas oficiais: Cancel Purchase e Return Tickets

A Epic permite que você desfaça muitas **compras de cosméticos do Item Shop feitas com V-Bucks** sem precisar entrar em contato com o suporte — se agir dentro dos prazos e o item for elegível.

Este guia segue a ajuda oficial da Epic sobre cobrança no Fortnite Battle Royale para cancelar ou reembolsar compras do Item Shop feitas com V-Bucks. As políticas podem ser atualizadas; se a interface do jogo divergir desta página, confie no jogo e na Ajuda da Epic.

Última revisão: agosto de 2026. Leituras relacionadas: o [rastreador do Item Shop](/tools/item-shop) e [como resgatar um código do Fortnite](/guides/how-to/how-to-redeem-fortnite-code).

## Comparação rápida

| Ferramenta | Janela de tempo | Limite extra | Melhor para |
| --- | --- | --- | --- |
| **Cancel Purchase** | Dentro de **24 horas** após a compra | O item precisa estar **sem uso / sem equipar** em todos os modos | Compra acidental no mesmo dia |
| **Return Ticket** | Item comprado nos últimos **30 dias** | Os tickets são limitados (veja abaixo) | Erros percebidos após 24 horas |
| **Solicitação de reembolso em dinheiro real** | Fluxo de reembolso separado da Epic | Para compras em dinheiro de pacotes de V-Bucks, não todos os cosméticos | Comprou o pacote de V-Bucks errado com dinheiro |

Compras feitas dentro de **ilhas Creative criadas por desenvolvedores** não podem usar Cancel Purchase ou Return Tickets.

## O que geralmente não é possível reembolsar com Cancel Purchase / Return Tickets

O artigo de ajuda da Epic lista categorias que não podem ser devolvidas por essas ferramentas, incluindo:

- Battle Passes / Festival e outros passes
- Níveis de passe e trilhas de recompensas premium
- **Pacotes (bundles)** de cosméticos (Return Tickets podem exigir a devolução de todo o pacote elegível junto, quando pacotes são permitidos — siga o aviso no jogo)
- Compras **presenteadas**
- Level Up Quest Packs
- Loot Llamas do Save the World / certos itens da loja do STW
- Compras em ilhas de desenvolvedores

Se o seu arrependimento é um Battle Pass, as ferramentas de reembolso de cosméticos da Epic não vão desfazê-lo. Gaste seus V-Bucks com cuidado usando a [calculadora de V-Bucks](/tools/vbucks-calculator) antes de confirmar.

## Como usar o Cancel Purchase (desfazer em 24 horas)

Use isso quando comprou a skin errada há alguns minutos e nunca a equipou.

1. Abra o Fortnite e acesse seu **Locker** / o histórico de compras do item (os rótulos podem mostrar **Cancel Purchase** nos detalhes do item).
2. Selecione o item que você acabou de comprar.
3. Escolha **Cancel Purchase** se o botão estiver disponível.
4. Confirme. O cosmético é removido e os V-Bucks voltam para o seu saldo.

### O Cancel Purchase falha quando

- Já passaram mais de 24 horas
- Você equipou ou usou o item em qualquer modo (incluindo Creative / Festival / LEGO quando aplicável)
- O tipo de item está na lista de não reembolsáveis
- Você já cancelou essa compra uma vez (a Epic informa que cada item só pode ser cancelado uma vez; comprar de novo pode mostrar um aviso)

## Como usar um Return Ticket (janela de 30 dias)

Se o Cancel Purchase não estiver mais disponível, verifique se você tem um **Return Ticket**.

Regras de tickets publicadas pela Epic (verifique na sua conta — a Epic ajustou as concessões ao longo dos anos):

- As contas são fornecidas com Return Tickets (geralmente descritas como começando com **3**)
- Normalmente você recebe **1 ticket novo a cada 365 dias**
- Você pode manter um máximo limitado por vez (geralmente **3**)

### Passos

1. Abra o item no seu Locker / na interface de reembolso.
2. Escolha a opção Return Ticket quando oferecida.
3. Confirme. Os V-Bucks voltam e o item saí da sua conta.
4. Para pacotes elegíveis, devolva o conjunto completo quando a interface exigir.

Return Tickets são valiosos. Não use um em um spray de 200 V-Bucks se você puder clicar por engano em um traje de 2.000 V-Bucks depois.

## Compras em dinheiro real (pacotes de V-Bucks, Crew, etc.)

Se você gastou **dinheiro real** em pacotes de V-Bucks ou assinaturas e precisa de um reembolso em dinheiro, use o fluxo de **Solicitação de Reembolso** da Epic no site da Epic Games — não o botão Return Ticket dentro do jogo. As lojas de plataforma (PlayStation, Xbox, Nintendo) também podem exigir reembolsos via Sony / Microsoft / Nintendo em vez da Epic, dependendo de onde você pagou.

## Skins de presente

Presentes geralmente **não são reembolsáveis** via Cancel Purchase / Return Tickets. Se você foi enganado em uma troca de presentes, isso é uma questão de segurança da conta — ative o 2FA da Epic em [epicgames.com/account/password](https://www.epicgames.com/account/password) e contate o Suporte Epic com os detalhes do pedido. Não use "emprestadores de conta" para tentar "forçar um reembolso".

## Hábitos inteligentes para reembolsar com menos frequência

- Visualize os estilos na loja antes de comprar
- Confira as peças do conjunto no [rastreador do Item Shop](/tools/item-shop)
- Evite comprar sob pressão de overlays de stream ou amigos insistindo para "comprar"
- Mantenha ao menos um Return Ticket guardado
- Nunca equipe uma compra questionável até ter certeza — equipar pode acabar com a elegibilidade para o Cancel Purchase

## Perguntas frequentes

### Os V-Bucks reembolsados voltam instantaneamente?

Normalmente sim, aparecendo na tela após a confirmação. Reinicie o cliente se a interface do saldo demorar.

### Posso reembolsar uma skin da temporada passada?

Somente se ela ainda estiver dentro da janela de compra de **30 dias** do Return Ticket e for elegível. Itens mais antigos do Locker fora dessa janela permanecem na conta.

### Reembolsar afeta o status da minha conta?

Usar as ferramentas oficiais Cancel Purchase / Return Ticket como projetadas é normal. Chargebacks em compras com dinheiro real podem bloquear compras e colocar em risco ações na conta — use a solicitação de reembolso oficial da Epic em vez de contestar com seu banco como primeiro passo.`,
    },
    redeem: {
      metaTitle: 'Como resgatar um código do Fortnite (cartões de V-Bucks + códigos de criador)',
      metaDescription:
        'Resgate cartões-presente de V-Bucks em PC, Switch, PlayStation e Xbox — e veja como funcionam os códigos de Support-A-Creator no Item Shop e como evitar erros de conta errada.',
      title: 'Como resgatar um código do Fortnite (cartões de V-Bucks + códigos de criador)',
      excerpt:
        'Resgate cartões-presente de V-Bucks em PC, Switch, PlayStation e Xbox — e veja como funcionam os códigos de Support-A-Creator no Item Shop e como evitar erros de conta errada.',
      content: `## Dois tipos diferentes de "códigos do Fortnite" (não confunda)

Os jogadores pesquisam "resgatar código do Fortnite" para dois sistemas totalmente diferentes:

| Tipo de código | O que faz | Onde inserir |
| --- | --- | --- |
| **PIN do cartão-presente de V-Bucks / Fortnite** | Adiciona V-Bucks pré-pagos a uma conta Epic (aplicam-se regras de plataforma) | O site oficial [V-Bucks Card](https://www.fortnite.com/vbuckscard) — **não** a caixa de busca do Item Shop dentro do jogo |
| **Código de Support-A-Creator / criador** | Dá a um criador uma porcentagem das compras elegíveis; **não** dá V-Bucks grátis | Fortnite **Item Shop → Enter Code** (ou o campo de código de criador no checkout) |

Se você comprou um cartão físico e tentar digitar o PIN como código de criador, isso vai falhar. Se digitar a tag de criador de um streamer no site do cartão de V-Bucks, isso também vai falhar.

Última revisão: 1 de agosto de 2026. Ajuda oficial do cartão de V-Bucks: [Como resgatar um cartão de V-Bucks](https://www.epicgames.com/help/en-US/c-Category_Fortnite/c-Fortnite_Billingandpayment/how-to-redeem-a-v-bucks-card-a000084845). Guarde seu recibo até que o saldo apareça corretamente.

Relacionado: [reembolsos](/guides/how-to/how-to-refund-fortnite-skins), [calculadora de V-Bucks](/tools/vbucks-calculator), [Item Shop](/tools/item-shop).

## Antes de resgatar qualquer coisa

1. Entre na **conta Epic dona do seu Locker** — confira as skins em [epicgames.com/account](https://www.epicgames.com/account) antes de colar um PIN.
2. Confirme se o perfil de console / Microsoft / PlayStation que você vai selecionar está vinculado a esse ID Epic em Conta → Conexões.
3. Ative o 2FA da Epic em [epicgames.com/account/password](https://www.epicgames.com/account/password) para que um PC compartilhado da família não gaste seu cartão no login errado.
4. Raspe o PIN com cuidado; não compre "verificadores de código" nem "bots de resgate" do Discord.

## Como resgatar um cartão de V-Bucks (todas as plataformas começam aqui)

O fluxo da Epic é principalmente baseado na web. Geralmente você **não pode** concluir um cartão físico de V-Bucks apenas colando o PIN dentro do cliente do Fortnite.

1. Abra [fortnite.com/vbuckscard](https://www.fortnite.com/vbuckscard) em um navegador.
2. Clique em **Get Started** e entre na conta Epic Games correta (use os botões de login de console se for assim que você normalmente se autentica).
3. Digite o PIN do verso do cartão / do e-mail digital — geralmente **sem hífens**.
4. Clique em **Next**.
5. Escolha a **plataforma / dispositivo** em que você joga Fortnite. Apenas plataformas vinculadas aparecem — se a sua estiver faltando, corrija as Conexões primeiro.
6. Revise o nome da conta Epic, o dispositivo e o saldo projetado, depois clique em **Confirm**.

### PC, Nintendo Switch e celular

Após o Confirm, os V-Bucks geralmente entram na carteira Epic daquele caminho de plataforma. Abra o Fortnite, vá ao Item Shop e verifique o saldo. Force o encerramento e reabra uma vez se a interface demorar.

### PlayStation (PS5 / PS4) — código secundário necessário

Selecionar PlayStation gera um **código secundário da PlayStation Store** (a Epic o exibe e/ou envia por e-mail). Você precisa resgatar esse código na **conta Sony vinculada à sua Epic**:

1. Termine a etapa Confirm em fortnite.com/vbuckscard com **PlayStation** selecionado.
2. Copie o código secundário fornecido pela Epic.
3. Resgate-o na PlayStation Store (console: Configurações / PlayStation Store → Resgatar códigos, ou a página web de resgate da Sony enquanto estiver conectado na PSN correta).
4. Use uma **janela anônima** se tiver vários logins de PSN — resgatar no ID Sony errado é o pesadelo número um do suporte.
5. Reabra o Fortnite nessa PSN e verifique os V-Bucks.

### Xbox — código secundário da Microsoft necessário

Mesmo padrão de duas etapas do PlayStation:

1. Confirme em fortnite.com/vbuckscard com **Xbox** selecionado.
2. Copie o código secundário do tipo pré-pago da **Microsoft / Xbox** gerado pela Epic.
3. Resgate-o na conta Microsoft vinculada à sua Epic (interface de resgate do console Xbox ou site de resgate da Microsoft).
4. Reabra o Fortnite e verifique o saldo.

A página de ajuda da Epic destaca explicitamente que Xbox / PlayStation precisam dessa etapa secundária de resgate; PC / Switch / celular geralmente não precisam.

## Códigos de criador (Support-A-Creator) — como funcionam de fato

Um código de criador **não** libera skins nem adiciona V-Bucks. Ele informa à Epic qual criador deve receber uma parte das compras **elegíveis** que você faz enquanto o código estiver ativo.

### Como inserir um código de criador

1. Abra o Fortnite e vá ao **Item Shop**.
2. Encontre **Enter Code** / Support-A-Creator (o texto varia um pouco por patch).
3. Digite o código do criador exatamente (geralmente o nome do streamer ou uma tag curta).
4. Confirme. Você deve ver o nome do criador aplicado por uma janela limitada de tempo (a Epic varia por quanto tempo um código "permanece" — reinsira-o antes de compras grandes se tiver dúvidas).
5. Compre Battle Pass, pacotes de V-Bucks (quando elegíveis), Crew ou cosméticos da loja normalmente.

### Perguntas frequentes sobre códigos de criador que os jogadores costumam errar

- **Não é um cupom.** O preço permanece o mesmo.
- **Não é o PIN de um cartão de V-Bucks.** Sistema diferente.
- **Presentes / alguns SKUs podem não ser elegíveis** dependendo das regras atuais de SAC da Epic — se o código não se aplicar, a compra ainda pode ser concluída sem apoiar ninguém.
- **Você pode trocar de código** antes de finalizar a compra; geralmente o último código confirmado vale para aquela sessão/janela.
- Sites de phishing que pedem para você "verificar o código de criador" com sua senha são golpes — use apenas o campo da loja dentro do jogo ou as páginas oficiais da Epic.

## Chaves da Epic Games Store vs. cartões de V-Bucks do Fortnite

Alguns produtos físicos "Fortnite" ou cartões de carteira Epic são resgatados nas páginas de resgate da loja **epicgames.com** em vez de fortnite.com/vbuckscard. Se a embalagem disser **Epic Games Store** / crédito de carteira, siga a URL de resgate da Epic impressa no cartão — não force pelo site do cartão de V-Bucks.

## Erros comuns de resgate e soluções

| Problema | Causa provável | Solução |
| --- | --- | --- |
| "Código inválido" | Erro de digitação, já usado, tipo de produto errado | Verifique o PIN novamente; não reutilize; confirme que é um cartão de V-Bucks e não uma tag de criador |
| Plataforma ausente na lista | Console não vinculado a essa Epic | Vincule o console em Conta Epic → Conexões e tente novamente |
| Saldo ausente no PS/Xbox | Código secundário nunca resgatado | Verifique o e-mail / confirmação da Epic para o segundo código; resgate-o no ID Sony/Microsoft correto |
| V-Bucks no Locker "errado" | Conectado na Epic errada | Pare; contate a Epic com o recibo — evite isso conferindo o Locker *antes* do Confirm |
| Cartão diz bloqueio regional | Limites de SKU regional | Resgate em uma loja/conta compatível com as regras regionais do cartão |
| Conta infantil / controles parentais | Restrições de compra | O responsável precisa concluir as etapas de resgate na loja do console |

## Lista de segurança (evitar golpes)

- Resgate apenas em **fortnite.com** / **epicgames.com** / lojas oficiais de console
- Nunca envie um PIN para "suporte" via Discord, DM do Instagram ou "hosts de sorteio"
- Nunca publique uma captura de tela de um PIN completo e não usado
- Se um site pedir sua senha **e** o PIN do cartão juntos fora do login da Epic, saia
- Depois de resgatar, você pode gastar com a [calculadora de V-Bucks](/tools/vbucks-calculator) e conferir o [Item Shop](/tools/item-shop) antes de compras por impulso

## Perguntas frequentes

### Posso resgatar um cartão de V-Bucks dentro do Fortnite?

Não como fluxo principal. Comece em [fortnite.com/vbuckscard](https://www.fortnite.com/vbuckscard). Jogadores de console terminam depois na PlayStation Store / Microsoft Store quando solicitado.

### Os V-Bucks são transferidos entre PC e console?

Os V-Bucks seguem as regras de carteira de plataforma da Epic e a forma como você os resgatou. Cosméticos de progresso cruzado ficam na conta Epic, mas os saldos para gastar podem ser separados por plataforma — resgate intencionalmente para o dispositivo em que você compra, e leia a pré-visualização do saldo na tela da Epic antes de clicar em Confirm.

### Posso reembolsar um cartão já resgatado?

Geralmente não, depois de resgatado. Guarde o recibo para o Suporte Epic caso o PIN falhe ou seja registrado incorretamente. O arrependimento de um cosmético depois de gastar V-Bucks é outra ferramenta — [guia de reembolsos](/guides/how-to/how-to-refund-fortnite-skins).

### Como apoio um criador sem comprar nada?

Inserir um código sozinho não faz nada até você fazer uma compra elegível. Adicione à lista de desejos com o [rastreador do Item Shop](/tools/item-shop) e compre quando estiver pronto.`,
    },
  },
}

for (const [loc, ov] of Object.entries(overlays)) {
  const path = join(root, `messages/${loc}.json`)
  const data = JSON.parse(readFileSync(path, 'utf8'))
  data.guides = deepMerge(data.guides || {}, ov)
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
  console.log('patched guides', loc)
}

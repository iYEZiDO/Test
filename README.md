# Soldaten gegen Zombiehorden

Dieses Projekt ist ein kleines Browser-Spiel, das komplett in Vanilla&nbsp;HTML, CSS und JavaScript umgesetzt wurde. Ziehe den Soldaten per Maus oder Touch nach links und rechts, schieße auf Zahlenfelder und rekrutiere neue Kameraden, während Zombiehorden auf deine Basis marschieren.

## Features

- Drag-&-Drop-Steuerung für den Soldaten auf einem Canvas-Spielfeld.
- Zufällig generierte Zahlenfelder mit Werten von **-20 bis +80**.
- Positive Zahlen verstärken deinen Trupp, negative Werte kosten Kameraden.
- Dynamische Freischaltung neuer Waffen (Pistole bis Raketenwerfer) mit unterschiedlichen Feuerraten.
- Aufstieg durch militärische Ränge vom Rekruten bis zum General.
- Zombiehorden mit steigender Geschwindigkeit, die deine Basis angreifen.
- Ereignisprotokoll, Statusanzeigen und Game-Over-Handling inklusive Neustart.

## Entwicklung & Start

Für die lokale Entwicklung reicht ein einfacher statischer Webserver. Du kannst beispielsweise im Projektverzeichnis folgenden Befehl ausführen:

```bash
python -m http.server 8000
```

Anschließend ist das Spiel unter <http://localhost:8000/> erreichbar.

## Steuerung

- **Ziehen** des Soldaten mit gedrückter Maustaste bzw. per Touch-Geste.
- **Loslassen** der Taste bzw. des Touches oder Klick auf den Button "Feuer!" zum Schießen.
- Alternativ kann auch die **Leertaste** zum Schießen verwendet werden.
- Nach einem Game Over lässt sich das Spiel per Leertaste oder den Button neu starten.

Viel Erfolg beim Halten der Linie!

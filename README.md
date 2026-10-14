# Simulador de camps vectorials i mecànica de fluids

![Simulació 3D de camps vectorials](demo.gif)

Simulador interactiu per visualitzar camps vectorials 3D, línies de corrent i funcions potencial (φ) i de corrent (ψ). Desenvolupat com a eina d'aprenentatge per a l'assignatura de **Mecànica de Fluids** del Grau en Física (UAB).

> **Estat:** projecte en desenvolupament. Properes millores: nous obstacles geomètrics i càlcul simbòlic.

## Com executar-lo

No cal instal·lar res. Obre `visualitzador_camps.html` en un navegador modern (Chrome, Edge, Firefox o Safari).

També pots llançar-lo amb Python:

    git clone https://github.com/Seijo37/Vectors1.git
    cd Vectors1
    python obrir_simulador.py

## Què fa

- Visualització 3D interactiva (rotació, zoom i desplaçament) amb Three.js.
- Traçadors de partícules que mostren com es mou el fluid en temps real.
- Vectors orientats i acolorits segons la velocitat local.
- Mode 3D o mode pla 2D per analitzar fluxos plans.

## Mètodes d'entrada

1. Components del camp (u, v, w) com a expressions de x, y, z i t.
2. Funció potencial φ, amb comprovació de Laplace (flux incompressible i irrotacional).
3. Funció de corrent ψ, amb càlcul de la vorticitat.
4. Parell φ i ψ, amb comprovació de les condicions de Cauchy-Riemann.

## Exemples inclosos

Presets dels exercicis del full de Fluids: flux hiperbòlic, vòrtex rígid, flux lineal general, flux al voltant d'un cilindre i flux no estacionari.

## Tecnologies

HTML, CSS i JavaScript, Three.js (WebGL). Python, NumPy i Matplotlib per a eines auxiliars.

## Autor

Joan Puertas Buscallà, estudiant de Física a la UAB.  
[LinkedIn](https://www.linkedin.com/in/joan-puertasbuscalla/)

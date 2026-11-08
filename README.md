# Fluids i Superfluids — Simuladors de Camps Vectorials i Mapa del Curs

Plataforma web interactiva per visualitzar camps vectorials 3D/2D, línies de corrent, dinàmica de vòrtexs, flux potencial ($\phi, \psi$) i règims viscosos de Navier-Stokes.

Ho he desenvolupat com a eina d'estudi i visualització mentre curso l'assignatura de **Fluids i Superfluids** a **4t del Grau en Física** a la Universitat Autònoma de Barcelona (UAB). Quan fas els fulls de problemes o prepares els parcials, sovint costa veure què representen físicament solucions com el potencial complex $w(z) = \phi + i\psi$, la diferència entre *streamlines*, *pathlines* i *streaklines*, o com es desprèn el punt d'estancament en un cilindre amb circulació. Aquest projecte permet jugar en directe amb totes les equacions del curs.

> **Estat:** operatiu amb els 4 temes del curs, el laboratori 3D/2D de camps vectorials (amb integrador RK4, isolínies $\psi=\text{ct}, \phi=\text{ct}$, tensor $S_{ij}$ i càlcul de circulació $\Gamma$), 5 simuladors específics per temes i el mapa interactiu amb tots els problemes i exàmens parcials.

## Com executar-lo

No cal instal·lar cap dependència: tot funciona directament al navegador. Obre `index.html` (portada general) o `visualitzador_camps.html` (laboratori 3D) en qualsevol navegador modern.

També pots clonar el repositori i obrir-lo amb Python:

    git clone https://github.com/Seijo37/Vectors1.git
    cd Vectors1
    python obrir_simulador.py

## Estructura del projecte

- **`index.html` (Portada del curs):** Índex general dels 4 temes de l'assignatura amb accés directe a cada simulador i al mapa conceptual.
- **`mapa/` (Mapa conceptual interactiu):** Graf de dependències entre tots els conceptes del curs (organitzats en 4 línies argumentals + 1 bloc transversal d'EDP i teoremes de balanç), connectat amb els 27 exercicis dels fulls de problemes i els exàmens parcials. Permet marcar quins conceptes tens clars, on tens dubtes i quins exercicis ja has resolt (desat automàticament al `localStorage` del navegador).
- **`visualitzador_camps.html` (Laboratori 3D i 2D de camps vectorials):** Motor WebGL amb Three.js i integrador Runge-Kutta 4 (RK4) per introduir qualsevol camp $(u,v,w)$, funció potencial $\phi$ o funció de corrent $\psi$, traçar isolínies ($\psi=\text{ct}$ i $\phi=\text{ct}$), variar paràmetres físics reactius ($\alpha, \beta, a$), comprovar la incompressibilitat ($\vec{\nabla}\cdot\vec{u}=0$), el tensor de deformació $S_{ij}$, la circulació $\Gamma = \oint \vec{u}\cdot d\vec{r}$ (Teorema de Stokes) i les condicions de Cauchy-Riemann.
- **`simuladors/` (Banc de simuladors per temes):**
  1. **Tema 1 (`01_medis_continus/hidrostatica_no_inercial.html`):** Dipòsit accelerat amb globus d'heli submergit (Parcial Nov 2024 i Probl. 5), cilindre en rotació $\Omega$ amb un o dos líquids immiscibles formant paraboloides (Probl. 6), tub en U amb oscil·lacions i acceleròmetre (Parcial Nov 2019), i barrera flotant de contenció d'oli (Probl. 8).
  2. **Tema 2 (`02_cinematica/cinematica_deformacio.html`):** Comparació en temps real de *streamlines*, *pathlines* i *streaklines* per a fluxos no estacionaris (Probl. 15) i deformació d'un element de fluid segons el tensor velocitat de deformació $S_{ij}$ i la vorticitat $\vec{\omega}$ (Probl. 12–16 i Parcials 2019/2022/2023).
  3. **Tema 3A (`03_fluids_ideals/vortexs_bernoulli.html`):** Comparativa dels models de vòrtex (lliure, Rankine del Parcial Nov 2023, Kaufmann i Gaussià) amb el seu perfil de superfície lliure, dinàmica de parells de vòrtexs ($\Gamma_1, \Gamma_2$) i mètode d'imatges, i buidatge de dipòsits per Torricelli (esfèric, cilíndric i clepsidra $r=az^{1/4}$, Probl. 17).
  4. **Tema 3B (`03_fluids_ideals/potencial_kutta_zhukovsky.html`):** Flux potencial al voltant d'un cilindre amb circulació $\Gamma$, efecte Magnus i teorema de Kutta-Zhukovsky (Probl. 21 i 22), esfera 3D amb dipol i massa afegida $M_f$ (Parcials 2019 i 2023), òval de Rankine font+embornal (Probl. 24) i fluxos en diedres $w(z)=Az^n$ (Probl. 20 i 27).
  5. **Tema 4 (`04_fluids_newtonians/viscositat_navier_stokes.html`):** Canal pla de Couette-Poiseuille amb escalfament viscós $\Delta T(y)$, conducte cilíndric de Hagen-Poiseuille ($Q \propto a^4$), 1r i 2n problema de Stokes ($\delta \sim \sqrt{\nu t}$ i paret oscil·lant), difusió viscosa d'un vòrtex de Lamb-Oseen i reologia de fluids no newtonians.

## Mencions i tecnologies

- He utilitzat la teoria i exercicis de l'assignatura de **Fluids i Superfluids** del Grau en Física (UAB).
- Basant l'esquema, la distribució i el funcionament en el repositori [`xalvarezc/estat_solid`](https://github.com/xalvarezc/estat_solid).
- **Tecnologies:** HTML5, CSS3, JavaScript (ES6), HTML5 Canvas 2D i [Three.js](https://threejs.org/) (WebGL) per a la visualització 3D en temps real. Python per a l'script llançador auxiliar.

## Autor

**Joan Puertas Buscallà**, estudiant de 4t del Grau en Física a la Universitat Autònoma de Barcelona (UAB).  
[LinkedIn](https://www.linkedin.com/in/joan-puertasbuscalla/)

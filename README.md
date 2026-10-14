# Simulador de Camps Vectorials 3D & Mecànica de Fluids

Simulador interactiu en temps real per a l'exploració, anàlisi i visualització de camps vectorials 3D.

Permet estudiar el comportament de fluxos de fluids, així com manipular funcions potencial ($\phi$) i funcions de corrent ($\psi$) tant en un volum tridimensional com en seccions planes 2D.

Aquest projecte s'ha desenvolupat com a eina de suport per a les assignatures de **Mecànica de Fluids** i **Física de l'Estat Sòlid** en el marc del Grau en Física a la Universitat Autònoma de Barcelona (UAB).

---

### 🚧 Estat del projecte: En desenvolupament actiu (Work in Progress)
Aquest projecte és un prototip funcional en evolució constant. Actualment implementa visualització en volum 3D i pla 2D, traçadors de corrent a 60 fps i comprovació automàtica de condicions físiques (Cauchy-Riemann, Laplace, divergència i vorticitat). S'estan preparant noves millores per afegir geometries d'obstacles addicionals i suport per a més operadors diferencials.

---

## ⚡ Instruccions ràpides d'execució

No requereix cap procés de compilació ni configuració de servidors:

### Opció 1: Llançament ràpid amb Python
```bash
# Clona el repositori
git clone https://github.com/Seijo37/Vectors1.git
cd Vectors1

# Obre el simulador automàticament al navegador
python obrir_simulador.py
```

### Opció 2: Directament des del navegador
Obre el fitxer `visualitzador_camps.html` fent doble clic o arrossegant-lo a qualsevol navegador modern (Chrome, Edge, Firefox o Safari). Les llibreries 3D (`Three.js` i `OrbitControls`) es carreguen automàticament mitjançant CDN.

---

## 🚀 Característiques principals

- **Visualització Tridimensional Interactiva (Three.js & WebGL)**:
  - Navegació fluida amb el ratolí: rotació orbital 3D, zoom suau i desplaçament (*pan*).
  - Caixa cúbica delimitadora $[-5, 5]^3$ amb els eixos de referència espacials $X, Y, Z$.
- **Traçadors de corrent en temps real (*Stream Tracers*)**:
  - 1.500 partícules que integren numèricament l'equació de moviment $\frac{d\vec{r}}{dt} = \vec{v}(\vec{r}, t)$ pas a pas, revelant visualment el flux real del fluid, fonts, embornals i vòrtexs.
- **Graella vectorial 3D adaptativa**:
  - Vectors cònics orientats per quaternions i amb mapa de color tèrmic segons el mòdul de la velocitat $|\vec{v}|$.
- **Suport dual 3D Volumètric & Pla 2D**:
  - Commutador ràpid per alternar entre l'espai tridimensional complet o restringir l'estudi al pla $Z = z_{\text{tall}}$ per visualitzar seccions planes netes.

---

## 📐 Formulació matemàtica i Constraints físiques

El simulador compta amb 4 modes d'entrada a la columna esquerra de controls:

1. **Components directes $(u, v, w)$**:
   - Permet introduir directament qualsevol camp vectorial $\vec{v}(x, y, z, t)$ amb expressions algebraiques o trigonomètriques.
2. **Funció Potencial $\phi(x, y, t)$**:
   - Determina les velocitats mitjançant el gradient: $u = \frac{\partial\phi}{\partial x}$, $v = \frac{\partial\phi}{\partial y}$.
   - **Constraint**: Avalua el Laplacià $\nabla^2\phi$. Si $\nabla^2\phi = 0$ (equació de Laplace), confirma que el flux és **incompressible** i **irrotacional**.
3. **Funció de Corrent $\psi(x, y, t)$**:
   - Genera automàticament un camp incompressible per construcció: $u = \frac{\partial\psi}{\partial y}$, $v = -\frac{\partial\psi}{\partial x}$.
   - **Constraint**: Avalua la vorticitat $\omega_z = -\nabla^2\psi$. Si $\omega_z = 0$, el flux és irrotacional; si $\omega_z \neq 0$, alerta de la presència de rotacional.
4. **Conjunt conjugat ($\phi$ i $\psi$)**:
   - Verifica numèricament les **condicions de Cauchy-Riemann**:
     $$\frac{\partial\phi}{\partial x} = \frac{\partial\psi}{\partial y}, \qquad \frac{\partial\phi}{\partial y} = -\frac{\partial\psi}{\partial x}$$
   - Mostra l'ortogonalitat arreu entre les línies de corrent ($\psi = \text{ct}$) i les línies equipotencials ($\phi = \text{ct}$).

---

## 📚 Exemples d'exercicis resolts

S'inclouen diversos exemples preconfigurats al selector de presets per visualitzar i comprovar les solucions de camps típics:

- **Exercici 12 (Flux hiperbòlic)**:
  - $\vec{u} = (ax, -ay, 0) \implies \phi = \frac{a}{2}(x^2 - y^2), \quad \psi = axy$.
  - Les partícules dibuixen les línies de corrent hiperbòliques $xy = C$.
- **Exercici 13 (Vòrtex rígid)**:
  - $\vec{u} = -3y\vec{\imath} + 3x\vec{\jmath} \implies \psi = -\frac{3}{2}(x^2 + y^2)$.
  - Incompressible amb vorticitat constant $\omega_z = -\nabla^2\psi = 6$. En tenir rotacional no nul, no admet funció potencial $\phi$.
- **Exercici 16 (Flux lineal general)**:
  - **Cas potencial & corrent ($\alpha=3, \beta=2$)**:
    $$\phi(x,y) = \frac{3}{2}x^2 + 2xy - \frac{3}{2}y^2, \qquad \psi(x,y) = y^2 + 3xy - x^2$$
    Compleix Cauchy-Riemann i es poden calcular i visualitzar **totes dues funcions simultàniament**.
  - **Cas amb vorticitat ($\alpha=3, \beta \neq 2$)**:
    Conserva la funció de corrent $\psi$ (per incompressibilitat), però la vorticitat $\omega_z = \beta - 2 \neq 0$ impedeix l'existència del potencial $\phi$.
- **Exercici 4 (Flux entorn d'un cilindre / protuberància)**:
  - Amb suport de coordenades polars planes ($r, \theta$):
    $$\phi(r,\theta) = \left(r^2 + \frac{a^4}{r^2}\right)\cos(2\theta), \qquad \psi(r,\theta) = \left(r^2 - \frac{a^4}{r^2}\right)\sin(2\theta)$$
- **Exercici 15 (Flux no estacionari amb temps $t$)**:
  - $u = x(1 + 2t), \; v = y$. Mostra la variació temporal de les línies de corrent.

---

## 🛠️ Tecnologies emprades

- **Frontend / Gràfics**: HTML5, CSS3, JavaScript (ES6+), [Three.js](https://threejs.org/) (WebGL) i `OrbitControls`.
- **Eines auxiliars**: Python 3 (script de llançament ràpid multiplataforma).
- **Inspiració**: Metodologia didàctica dels simuladors de física de l'estat sòlid (UAB).

---

## 👤 Autor
**Joan Puertas Buscallà**  
Estudiant del Grau en Física  
🔗 [Perfil de LinkedIn](https://www.linkedin.com/in/joan-puertasbuscalla/)

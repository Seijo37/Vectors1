# Pla de Millores del Simulador de Camps Vectorials i Mecànica de Fluids

**Projecte:** Visualitzador i Simulador Interactiu 3D/2D de Camps Vectorials  
**Repositori:** `d:\Programació\Vectors1`  
**Destinació d'ús:** Assignatura de *Fluids i Superfluids* (Física, UAB) i física de camps  
**Data d'avaluació:** 14 d'octubre de 2026  

---

## 1. Context i Anàlisi del Projecte Actual

### 1.1. Origen i Evolució
El projecte va néixer de la necessitat de transcendir els plots estàtics generats per scripts en Python (`plot_vectorial.py`, que utilitzava Matplotlib o exportava figures fixes amb Plotly a `camp_vectorial.html`). En aquest punt inicial no es disposava d'interactivitat en temps real, inspecció dinàmica ni integració contínua de partícules.

Inspirant-se en l'enfocament docent del repositori `estat_solid` (aplicacions web interactives desenvolupades pel professor Xavier Álvarez per a Física de l'Estat Sòlid a la UAB), es va dissenyar una aplicació web autònoma basada en **Three.js** (`visualitzador_camps.html`) amb el llançador auxiliar `obrir_simulador.py`. Aquesta eina aporta:
* Renderització a 60 fps amb `requestAnimationFrame`.
* Control de càmera orbital 3D complet (rotació, zoom i translació).
* Sistema de **1.500 partícules traçadores** per intuir la dinàmica del flux.
* Graella de vectors volumètrica 3D acolorida dinàmicament segons la magnitud de la velocitat $|\vec{v}|$.
* Caixa cúbica 3D delimitadora $[-5, 5]^3$ amb arestes i eixos $X, Y, Z$.
* Panell de lectura en directe de **Divergència** ($\vec{\nabla}\cdot\vec{v}$) i **Rotacional** ($|\vec{\nabla}\times\vec{v}|$) mitjançant diferències finites centrades.

### 1.2. Adaptació a Mecànica de Fluids
Posteriorment, per donar resposta als exercicis de la carpeta `Fluids/` (fulls de problemes de *Fluids i Superfluids*), es van afegir:
* **Quatre modes de formulació:**
  1. *Potencial $\phi(x,y,t)$*: Deriva les velocitats $u = \partial\phi/\partial x, v = \partial\phi/\partial y$ i verifica l'equació de Laplace $\nabla^2\phi = 0$ (incompressibilitat).
  2. *Funció de Corrent $\psi(x,y,t)$*: Deriva les velocitats $u = \partial\psi/\partial y, v = -\partial\psi/\partial x$ (incompressible per definició) i verifica la vorticitat $\omega_z = -\nabla^2\psi$.
  3. *Mode Conjunt $\phi$ i $\psi$*: Verifica les condicions de Cauchy-Riemann ($\partial\phi/\partial x = \partial\psi/\partial y$, $\partial\phi/\partial y = -\partial\psi/\partial x$) per garantir l'existència de potencial complex $F(z) = \phi + i\psi$ i l'ortogonalitat de les línies.
  4. *Mode Components*: Entrada lliure de $u, v, w$.
* **Presets de problemes acadèmics reals:**
  - *Problema 12*: Flux hiperbòlic $\phi = \frac{a}{2}(x^2 - y^2)$, $\psi = axy$.
  - *Problema 13*: Vòrtex rígid $\vec{u} = (-3y, 3x)$ amb $\omega_z = 6$ (sense potencial).
  - *Problema 16*: Flux lineal general $u = \alpha x + 2y$, $v = \beta x - 3y$ (cas irrotacional $\alpha=3, \beta=2$ amb $\phi$ i $\psi$ harmòniques conjugades, i cas amb vorticitat $\alpha=3, \beta=0$).
  - *Problema 4*: Flux al voltant d'un semicercle/cilindre en coordenades polars ($r, \theta$).
  - *Problema 15*: Flux no estacionari dependent del temps $u = x(1+2t), v = y$.

---

## 2. Objectius d'Ús del Simulador en Fluids i Superfluids

Perquè el simulador sigui una eina realment efectiva per a l'estudiant i l'investigador, ha de satisfer els següents objectius docents i analítics:
1. **Comprendre la cinemàtica bàsica euleriana vs lagrangiana:** Diferenciar visualment entre línies de corrent (*streamlines* a $t$ fix), trajectòries de partícules (*pathlines* en el temps) i línies d'emissió (*streaklines* des d'un punt emissor).
2. **Visualització d'equipotencials i línies de corrent:** Mostrar clarament les corbes $\phi = \text{ct}$ i $\psi = \text{ct}$ i la seva xarxa ortogonal (*flownet*).
3. **Càlcul integral de camps:** Avaluar numèricament la circulació $\Gamma = \oint \vec{u}\cdot d\vec{r}$ al voltant de corbes tancades i contrastar-la amb el Teorema de Stokes.
4. **Anàlisi local de la deformació fluida:** Descompondre el moviment local en translació, rotació rígida ($\vec{\omega}$) i ritme de deformació pur ($S_{ij}$).
5. **Comportament davant de condicions de contorn:** Representar geometries sòlides (com el cilindre de radi $a$) i verificar la condició de no penetració ($\vec{u}\cdot\vec{n} = 0$, equivalent a $\psi = \text{ct}$ a la paret).

---

## 3. Taula de Millores Proposades

| ID | Àrea / Mòdul | Estat Actual | Millora Proposada | Justificació Físico-Matemàtica | Impacte Docent | Complexitat |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **M1** | **Cinemàtica Temporal** | Les partícules es mouen amb $t$ creixent; es confonen trajectòries amb línies de corrent. | Implementar selector triple: **Línies de Corrent** ($t$ congelat), **Trajectòries** (integració temporal $\vec{r}(t)$) i **Streaklines** (partícules injectades des d'un punt). | Resolució directa dels Problemes 14 i 15. En flux no estacionari ($u = x(1+2t)$), les tres corbes són conceptualment i geomètricament diferents. | **Crític (Altíssim)** | Mitjana |
| **M2** | **Isolínies de Flux** | No es dibuixen corbes de nivell; només es veuen fletxes i partícules disperses. | Generador de **Corbes de Nivell (Contour Plots)** per a $\psi(x,y)=\text{ct}$ (línies de corrent) i $\phi(x,y)=\text{ct}$ (equipotencials). | Els Problemes 13 i 16c demanen dibuixar explícitament les corbes $\psi=\text{ct}$. Permet veure la xarxa ortogonal de Cauchy-Riemann. | **Crític (Altíssim)** | Mitjana |
| **M3** | **Parametrització Dinàmica** | Paràmetres fixos al codi (només dos valors fixos per a l'Ex 16). | Afegir **Sliders de Paràmetres Físics** ($\alpha, \beta, a, \Omega$) als presets. | A l'Ex 16, l'incompressibilitat requereix $\alpha=3$ i la irrotacionalitat requereix $\beta=2$. L'estudiant ha de poder moure $\beta$ i veure com apareix vorticitat. | **Alt** | Baixa |
| **M4** | **Precisió Numèrica** | Integrador Euler de 1r ordre ($\vec{r} \leftarrow \vec{r} + \vec{v}\Delta t$). Causa dispersió numèrica en vòrtexs. | Substituir per integrador **Runge-Kutta de 4t ordre (RK4)** per a les trajectòries i línies de corrent. | En vòrtexs tancats com l'Ex 13 ($\vec{u}=(-3y, 3x)$), Euler fa que les partícules s'allunyin en espiral cap a fora artificialment. RK4 manté les òrbites circulars estables. | **Alt** | Baixa-Mitjana |
| **M5** | **Càlcul Integral (Circulació)** | Només es mesura el rotacional puntual en un punt fix $(1,1,0)$. | Eina de **Càlcul de Circulació $\Gamma = \oint_C \vec{u}\cdot d\vec{r}$** sobre una circumferència interactiva parametritzada $(x-x_0)^2+(y-y_0)^2=R^2$. | Resolució directa de l'Ex 16a (circulació al voltant de $(x-1)^2+(y-6)^2=4$) i verificació numèrica del Teorema de Stokes ($\Gamma = \iint \omega_z dA$). | **Alt** | Mitjana |
| **M6** | **Tensor de Deformació** | Només es calculen la divergència i el mòdul del rotacional. | Matriu de lectura del **Tensor Ritme de Deformació $S_{ij} = \frac{1}{2}(\partial_i u_j + \partial_j u_i)$** i el tensor de rotació $\Omega_{ij}$. | Resolució directa de l'Ex 16e. Permet comprendre com es deforma un element fluid (dilatació vs cisallament) en el flux lineal. | **Mitjà** | Baixa |
| **M7** | **Condicions de Contorn** | L'Ex 4 té equacions en polars, però no es visualitza el semicercle com a obstacle físic. | Renderització 3D/2D d'**obstacles sòlids** (cilindre de radi $a$, parets planes) amb filtratge de partícules a la zona impermeable. | Resolució del Problema 4 (pla amb protuberància semicircular). Permet comprovar que la velocitat normal a la paret s'anul·la ($\vec{u}\cdot\vec{n}=0$). | **Mitjà** | Mitjana |
| **M8** | **Coordenades Polars Planes** | Es compilen `r` i `th` de manera genèrica, però les derivades es fan cartesianes per diferències finites. | Suport natiu de **coordenades polars $(r, \theta)$** amb formulació de velocitats $u_r = \partial\phi/\partial r = \frac{1}{r}\partial\psi/\partial\theta$ i $u_\theta = \frac{1}{r}\partial\phi/\partial\theta = -\partial\psi/\partial r$. | Molts problemes de fluids (membrana Ex 2, cilindre Ex 4, recipients circulars Ex 6) són naturalment polars o cilíndrics. Evita singularitats numèriques a l'origen. | **Mitjà** | Mitjana |
| **M9** | **Mòdul d'Estàtica** | El simulador està centrat exclusivament en cinemàtica/dinàmica de flux. | Afegir pestanya o mòdul d'**Estàtica de Fluids**: superfícies lliures en recipients accelerats (Ex 5) i paraboloides en recipients giratoris (Ex 6). | Cobreix el bloc complet del segon full de problemes (`probl02.pdf`), oferint una plataforma integral per a tota l'assignatura. | **Moderat** | Mitjana |
| **M10** | **Exportació de Dades i Gràfics** | No es poden guardar resultats de la simulació. | Botó per exportar captures d'alta resolució (PNG/SVG) i vectors de dades CSV de les lectures físiques. | Facilita la creació de figures per a memòries de pràctiques i informes de la carrera. | **Convenient** | Baixa |

---

## 4. Planificació de les Millores per Ordre d'Importància

L'estratègia d'implementació es divideix en 3 fases sequencials segons el valor afegit pedagògic i la urgència per a la resolució dels exercicis de l'assignatura.

```mermaid
flowchart TD
    subgraph Fase 1: Fonaments de Fluids i Cinemàtica (Prioritat Màxima)
        F1_1["M1: Distinció Línies Corrent vs Trajectòries vs Streaklines (Ex 14, 15)"]
        F1_2["M2: Corbes de Nivell / Isolínies psi=ct i phi=ct (Ex 13, 16c)"]
        F1_3["M3: Sliders de Paràmetres Reactius (alpha, beta, a) (Ex 16)"]
        F1_4["M4: Integrador RK4 per a fluxos estables (Ex 13)"]
    end

    subgraph Fase 2: Anàlisi Integral i Geometria (Prioritat Mitjana)
        F2_1["M5: Càlcul de Circulació i Verificació Stokes (Ex 16a)"]
        F2_2["M6: Tensor Ritme de Deformació Sij (Ex 16e)"]
        F2_3["M7: Obstacles Sòlids i Condicions de Contorn u·n=0 (Ex 4)"]
        F2_4["M8: Formulació Nativa en Polars (r, theta) (Ex 4, 6)"]
    end

    subgraph Fase 3: Expansió i Usabilitat (Prioritat Baixa / Evolutiva)
        F3_1["M9: Mòdul d'Estàtica de Fluids (Ex 5, 6)"]
        F3_2["M10: Exportador Gràfic i de Dades CSV"]
        F3_3["M11: Guia Teòrica Interactiva amb Fórmules KaTeX"]
    end

    F1_1 --> F2_1
    F1_2 --> F2_2
    F1_3 --> F2_2
    F1_4 --> F2_3
    F2_1 --> F3_1
    F2_3 --> F3_1
```

### Fase 1: Fonaments de Fluids i Cinemàtica Temporal (Prioritat Màxima / Urgent)
*Aquesta fase resol les confusions conceptuals bàsiques i permet fer directament els problemes 12, 13, 15 i 16.*
1. **M1 (Triplet Cinemàtic)**:
   - Afegir un selector al panell per triar:
     - *Línies de corrent (Streamlines)*: Integració a instant $t$ fix de $d\vec{r}/ds = \vec{v}(\vec{r}, t)$.
     - *Trajectòries (Pathlines)*: Traçadors materials amb evolució temporal completa $\vec{r}(t)$.
     - *Línies de traça (Streaklines)*: Emissió contínua de partícules des d'un punt d'injecció $(x_0, y_0)$ configurable (ex: punt $(1,1)$ de l'Ex 15).
2. **M2 (Isolínies $\psi = \text{ct}$ i $\phi = \text{ct}$)**:
   - Dibuixar les línies estàtiques de nivell de la funció corrent (línies de corrent) i de la funció potencial (equipotencials) amb una malla 2D mitjançant l'algorisme Marching Squares o contours 2D.
3. **M3 (Sliders Paramètrics per a l'Ex 16)**:
   - Controls de rang per a $\alpha \in [-5, 5]$ i $\beta \in [-5, 5]$. Quan $\alpha=3$, el badge indica *Incompressible*; quan $\beta=2$, el badge indica *Irrotacional (Flux Potencial)* i mostra tant $\phi$ com $\psi$.
4. **M4 (Integrador RK4)**:
   - Canviar el pas d'integració a Runge-Kutta d'ordre 4 perquè els vòrtexs i fluxos circulars no pateixin divergència numèrica per culpa d'Euler.

### Fase 2: Anàlisi Integral i Geometria de Contorn (Prioritat Mitjana)
*Aquesta fase permet abordar problemes avançats de contorns sòlids i càlculs diferencials/integrals.*
1. **M5 (Calculadora de Circulació i Stokes - Ex 16a)**:
   - Dibuixar la corba circular $(x-x_0)^2 + (y-y_0)^2 = R^2$ configurable.
   - Discretitzar la corba en $N$ segments i calcular numèricament $\Gamma = \sum \vec{u}_k \cdot \Delta\vec{r}_k$.
   - Integrar la vorticitat $\iint \omega_z dx dy$ a l'interior i mostrar la igualtat de Stokes en directe.
2. **M6 (Tensor de Ritme de Deformació - Ex 16e)**:
   - Calcular en el punt d'inspecció:
     $$S_{xx} = \frac{\partial u}{\partial x}, \quad S_{yy} = \frac{\partial v}{\partial y}, \quad S_{xy} = \frac{1}{2}\left(\frac{\partial u}{\partial y} + \frac{\partial v}{\partial x}\right)$$
   - Mostrar la matriu $S_{ij}$ i el tensor de rotació $\Omega_{xy} = \frac{1}{2}(\partial_y u - \partial_x v) = -\frac{1}{2}\omega_z$.
3. **M7 (Representació d'Obstacles Sòlids - Ex 4)**:
   - Dibuixar el semicercle de radi $a$ sobre el pla sòlid $y=0$ i no permetre l'entrada de partícules a $r < a$.
   - Visualitzar la condició de contorn $\vec{u}\cdot\vec{n} = 0$ a la superfície sòlida.
4. **M8 (Coordenades Polars Planes)**:
   - Entrada directa de funcions $\phi(r, \theta)$ i $\psi(r, \theta)$ amb càlcul analític de components:
     $$u_r = \frac{\partial\phi}{\partial r} = \frac{1}{r}\frac{\partial\psi}{\partial\theta}, \quad u_\theta = \frac{1}{r}\frac{\partial\phi}{\partial\theta} = -\frac{\partial\psi}{\partial r}$$

### Fase 3: Expansió i Usabilitat (Prioritat Baixa / Evolutiva)
*Evolució cap a una eina de laboratori virtual complet.*
1. **M9 (Mòdul d'Estàtica de Fluids - Ex 5 i 6)**:
   - Visualització 3D del recipient cilíndric giratori i la superfície lliure parabòlica $z = z_0 + \frac{\Omega^2 r^2}{2g}$.
   - Superfície lliure plana inclinada per a recipient accelerat amb acceleració $a$: $\tan\theta = a/g$.
2. **M10 (Exportació de Dades i Imatges)**:
   - Captura de pantalla en alta resolució sense interfície d'usuari (ideal per a informes).
   - Exportació CSV de perfils de velocitat al llarg d'una línia de tall.
3. **M11 (Integració Teòrica Interactiva)**:
   - Panell desplegable amb el pas a pas matemàtic de cada exercici resolt amb fórmules ben renderitzades.

---

## 5. Resum Executiu i Propers Passos
Aquest full de ruta transforma el simulador actual —que ja és un prototip 3D/2D àgil i funcional— en una **eina pedagògica de primer nivell** per a l'estudi de la mecànica de fluids a la universitat. 

El primer pas recomanat és iniciar la **Fase 1**, concretament afegint els **lliscadors interactius de $\alpha$ i $\beta$ per a l'Exercici 16**, la visualització de les **corbes de nivell $\psi=\text{ct}$ i $\phi=\text{ct}$**, i el selector entre **streamlines i pathlines**.

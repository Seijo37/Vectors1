// mapa_dades.js — Dades del mapa conceptual de Fluids i Superfluids
// Basat en l'esquema, la distribució i el funcionament de https://github.com/xalvarezc/estat_solid

var MAPA = {
  temes: {
    "00": { nom: "Camps i EDP", carpeta: "00_camps_edp", apunts: false },
    "01": { nom: "Medis continus i hidrostàtica", carpeta: "01_medis_continus", apunts: false },
    "02": { nom: "Cinemàtica dels fluids", carpeta: "02_cinematica", apunts: false },
    "03": { nom: "Fluids ideals i flux potencial", carpeta: "03_fluids_ideals", apunts: false },
    "04": { nom: "Fluids newtonians i viscositat", carpeta: "04_fluids_newtonians", apunts: false }
  },

  linies: [
    // =========================================================================
    // L1 — MEDIS CONTINUS, PRESSIÓ I HIDROSTÀTICA
    // =========================================================================
    {
      id: "L1",
      nom: "Del medi continu a l'equilibri hidrostàtic",
      curt: "Continu i hidrostàtica",
      temes: "Tema 1",
      color: "#007A53",
      desc: "Quan podem tractar un conjunt de molècules com un camp continu, com definim la pressió i com respon un fluid en repòs, en rotació o sota la seva pròpia gravetat.",
      estacions: [
        {
          id: "E1_1", tema: "01", nom: "Hipòtesi del continu i magnituds locals", curt: "Hipòtesi del continu",
          conceptes: [
            { id: "knudsen", nom: "Hipòtesi del continu i nombre de Knudsen (Kn = λ/L)",
              desc: "Un fluid es pot descriure amb camps continus ρ(r,t), u(r,t) quan el recorregut lliure mitjà molecular λ és molt més petit que l'escala macroscòpica L (Kn ≪ 1), prenent un volum d'escala intermèdia δV = l³ amb λ ≪ l ≪ L.",
              cal: [], veure: [], ex: [],
              sims: [{ t: "Simulador d'hidrostàtica", u: "01_medis_continus/hidrostatica_no_inercial.html" }] },
            { id: "forces_vol_sup", nom: "Forces de volum, forces de superfície i principi de Pascal",
              desc: "Distinció entre forces de llarg abast proporcionals a la massa (ρf dV) i forces de contacte a través de la superfície dS. En un fluid en repòs (o ideal), la força per unitat d'àrea és normal a la superfície (−p n dS) i la pressió p és isòtropa en totes direccions (principi de Pascal).",
              cal: ["knudsen"], veure: ["tensor_esforcos"], ex: ["7"],
              sims: [{ t: "Simulador d'hidrostàtica", u: "01_medis_continus/hidrostatica_no_inercial.html" }] }
          ]
        },
        {
          id: "E1_2", tema: "01", nom: "Equació fonamental de l'hidrostàtica i atmosfera", curt: "Equilibri hidrostàtic",
          conceptes: [
            { id: "eq_hidrostatica", nom: "Equació fonamental de l'hidrostàtica (−∇p + ρf = 0)",
              desc: "Balanç local entre el gradient de pressions i les forces de volum. Si f = −∇Φ és conservativa, les superfícies isobàriques coincideixen amb les equipotencials i cal que ∇ρ × ∇Φ = 0 (fluid barotròpic).",
              cal: ["forces_vol_sup", "camps_escalars_vectorials"], veure: ["eq_euler"], ex: ["7", "P22.1"],
              sims: [{ t: "Simulador d'hidrostàtica", u: "01_medis_continus/hidrostatica_no_inercial.html" }] },
            { id: "atmosfera_barotropica", nom: "Fluids barotròpics: atmosfera isoterma i adiabàtica",
              desc: "En un líquid incompressible p = p₀ − ρgz. En l'atmosfera isoterma p(z) = p₀ exp(−z/z₀), mentre que amb un gradient tèrmic lineal (atmosfera politròpica o adiabàtica p = Cρ^γ) la temperatura i la pressió cauen linealment amb l'altitud.",
              cal: ["eq_hidrostatica"], veure: ["autogravitant"], ex: ["9"],
              sims: [{ t: "Simulador d'hidrostàtica", u: "01_medis_continus/hidrostatica_no_inercial.html" }] },
            { id: "arquimedes_flotacio", nom: "Principi d'Arquimedes i estabilitat de flotació",
              desc: "La força resultant de pressió sobre un cos submergit és l'empenta E = M_f g aplicada al centre d'empenta (centre de masses del fluid desallotjat). El parell restaurador quan el cos s'inclina depèn de la posició relativa del centre de gravetat i el centre d'empenta.",
              cal: ["eq_hidrostatica"], veure: [], ex: ["8", "P22.1", "P24.1"],
              sims: [{ t: "Simulador d'hidrostàtica", u: "01_medis_continus/hidrostatica_no_inercial.html" }] }
          ]
        },
        {
          id: "E1_3", tema: "01", nom: "Sistemes no inercials i hidroestàtica autogravitant", curt: "Sistemes no inercials",
          conceptes: [
            { id: "accelerat_lineal", nom: "Recipient amb acceleració lineal constant i pèndol submergit",
              desc: "En el sistema de referència del recipient accelerat amb a, la força efectiva per unitat de massa és f_ef = g − a. Les isòbares són plans inclinats un angle tan θ = a/g. Un cos més lleuger que el fluid (com un globus d'heli) s'inclina en el mateix sentit de l'acceleració a!",
              cal: ["eq_hidrostatica", "arquimedes_flotacio"], veure: [], ex: ["5", "P19.2", "P24.1"],
              sims: [{ t: "Simulador d'hidrostàtica", u: "01_medis_continus/hidrostatica_no_inercial.html" }] },
            { id: "cilindre_rotacio", nom: "Fluid en rotació uniforme: paraboloide de revolució i dos líquids",
              desc: "Amb velocitat angular Ω constant, la força centrífuga genera p(r,z) = p₀ + ½ρΩ²r² − ρgz. Tant la superfície lliure com la interfície entre dos líquids immiscibles ρ₁ i ρ₂ adopten la mateixa forma de paraboloide z − z₀ = Ω²r²/(2g).",
              cal: ["eq_hidrostatica"], veure: ["vortex_rankine"], ex: ["6"],
              sims: [{ t: "Simulador d'hidrostàtica", u: "01_medis_continus/hidrostatica_no_inercial.html" }] },
            { id: "autogravitant", nom: "Equilibri hidroestàtic autogravitant i equació de Lane-Emden",
              desc: "Quan el propi fluid genera el camp gravitatori (∇²Φ = 4πGρ), l'equació d'equilibri ∇·(ρ⁻¹∇p) + 4πGρ = 0 amb una llei politròpica p = Cρ^(1+1/n) permet obtenir el perfil intern de pressió i densitat d'estrelles i planetes.",
              cal: ["eq_hidrostatica", "atmosfera_barotropica"], veure: [], ex: ["9"],
              sims: [{ t: "Simulador d'hidrostàtica", u: "01_medis_continus/hidrostatica_no_inercial.html" }] }
          ]
        }
      ]
    },

    // =========================================================================
    // L2 — CINEMÀTICA DELS FLUIDS, DEFORMACIÓ I VORTICITAT
    // =========================================================================
    {
      id: "L2",
      nom: "Cinemàtica: moviment, deformació i vorticitat",
      curt: "Cinemàtica i vorticitat",
      temes: "Tema 2",
      color: "#1E5B94",
      desc: "Com descrivim la geometria del moviment d'un fluid sense mirar encara les forces: trajectòries, línies de corrent, conservació de la massa, deformació local d'un element de fluid i rotació (vorticitat).",
      estacions: [
        {
          id: "E2_1", tema: "02", nom: "Descripció euleriana, lagrangiana i corbes del flux", curt: "Corbes i derivada material",
          conceptes: [
            { id: "euler_lagrange", nom: "Descripció lagrangiana vs euleriana i derivada material D/Dt",
              desc: "Seguir cada partícula individual r(r₀,t) (Lagrange) enfront de mesurar el camp u(r,t) en punts fixos de l'espai (Euler). La taxa de canvi experimentada per una partícula de fluid és la derivada material D/Dt = ∂/∂t + (u·∇), on (u·∇)u és l'acceleració convectiva.",
              cal: ["knudsen", "camps_escalars_vectorials"], veure: ["teorema_reynolds"], ex: ["12", "14"],
              sims: [
                { t: "Cinemàtica i deformació", u: "02_cinematica/cinematica_deformacio.html" },
                { t: "Laboratori 3D de camps", u: "../visualitzador_camps.html" }
              ] },
            { id: "stream_path_streak", nom: "Línies de corrent (streamlines), trajectòries (pathlines) i línies de traçat (streaklines)",
              desc: "En un flux no estacionari u(r,t), les corbes tangents al camp en un instant fix (streamlines), el camí d'una partícula (pathline) i la línia que dibuixa un colorant injectat des d'un punt fix (streakline) són diferents; només coincideixen quan el flux és estacionari (∂u/∂t = 0).",
              cal: ["euler_lagrange"], veure: [], ex: ["12", "14", "15"],
              sims: [{ t: "Cinemàtica i deformació", u: "02_cinematica/cinematica_deformacio.html" }] }
          ]
        },
        {
          id: "E2_2", tema: "02", nom: "Tensor gradient de velocitats, deformació i vorticitat", curt: "Tensor S_ij i vorticitat",
          conceptes: [
            { id: "tensor_deformacio", nom: "Descomposició del gradient de velocitats: tensor de deformació S_ij i rotació R_ij",
              desc: "El moviment relatiu prop d'un punt du_i = (∂u_i/∂x_j) dx_j es descompon en la part simètrica S_ij = ½(∂_j u_i + ∂_i u_j) (ritme d'estirament i deformació angular) i la part antisimètrica R_ij associada a una rotació rígida amb velocitat angular Ω = ½ω.",
              cal: ["euler_lagrange"], veure: ["llei_newton_viscosa"], ex: ["16", "P19.1", "P22.2"],
              sims: [{ t: "Cinemàtica i deformació", u: "02_cinematica/cinematica_deformacio.html" }] },
            { id: "vorticitat_circulacio", nom: "Vorticitat ω = ∇×u, circulació Γ i teorema de Stokes",
              desc: "La vorticitat ω = ∇×u mesura el doble de la velocitat angular local dels elements de fluid. Per Stokes, la circulació Γ = ∮ u·dl al voltant d'una corba tancada és el flux de vorticitat ∫ ω·dS a través de la superfície.",
              cal: ["tensor_deformacio"], veure: ["teorema_kelvin"], ex: ["13", "16", "P19.1"],
              sims: [
                { t: "Cinemàtica i deformació", u: "02_cinematica/cinematica_deformacio.html" },
                { t: "Laboratori 3D de camps", u: "../visualitzador_camps.html" }
              ] }
          ]
        },
        {
          id: "E2_3", tema: "02", nom: "Conservació de la massa, incompressibilitat i funció de corrent ψ", curt: "Continuïtat i funció ψ",
          conceptes: [
            { id: "eq_continuitat", nom: "Equació de continuïtat i divergència com a dilatació volumètrica",
              desc: "La conservació de la massa imposa ∂ρ/∂t + ∇·(ρu) = 0, o Dρ/Dt + ρ∇·u = 0. La traça del tensor de deformació S_ii = ∇·u és el ritme relatiu de canvi de volum; en un fluid incompressible es redueix a ∇·u = 0.",
              cal: ["euler_lagrange", "tensor_deformacio"], veure: ["teorema_reynolds"], ex: ["14", "16", "P19.1", "P22.2"],
              sims: [{ t: "Laboratori 3D de camps", u: "../visualitzador_camps.html" }] },
            { id: "funcio_corrent", nom: "Funció de corrent ψ(x,y) en fluxos 2D incompressibles i cabal Q",
              desc: "En 2D amb ∇·u = 0, podem definir u = ∂ψ/∂y, v = −∂ψ/∂x (u = ∇ψ × k). Les corbes ψ = const són les línies de corrent, la diferència ψ(B) − ψ(A) dóna directament el cabal per unitat d'alçada entre dues línies, i la vorticitat és ω_z = −∇²ψ.",
              cal: ["eq_continuitat", "vorticitat_circulacio"], veure: ["potencial_complex"], ex: ["13", "16", "23", "P22.2", "P24.2"],
              sims: [
                { t: "Laboratori 3D de camps", u: "../visualitzador_camps.html" },
                { t: "Cinemàtica i deformació", u: "02_cinematica/cinematica_deformacio.html" }
              ] }
          ]
        }
      ]
    },

    // =========================================================================
    // L3 — DINÀMICA DE FLUIDS IDEALS, BERNOULLI I VÒRTEXS
    // =========================================================================
    {
      id: "L3",
      nom: "Fluids ideals: equació d'Euler, Bernoulli i vòrtexs",
      curt: "Euler, Bernoulli i vòrtexs",
      temes: "Tema 3A",
      color: "#B45309",
      desc: "Quan els efectes viscosos són negligibles (nombre de Reynolds alt), el moviment és governat per l'equació d'Euler: conservació de l'energia mecànica sobre les línies de corrent (Bernoulli) i conservació de la circulació (Kelvin).",
      estacions: [
        {
          id: "E3_1", tema: "03", nom: "Equació d'Euler, nombre de Reynolds i ones acústiques", curt: "Euler i acústica",
          conceptes: [
            { id: "eq_euler", nom: "Equació d'Euler i estimació del nombre de Reynolds Re = UL/ν",
              desc: "Segona llei de Newton per a un fluid perfecte (η = 0): ρ Du/Dt = −∇p + ρf. És una bona aproximació lluny de les parets sòlides quan el terme inercial domina sobre el viscós (Re = ρUL/η ≫ 1).",
              cal: ["eq_hidrostatica", "euler_lagrange"], veure: ["navier_stokes"], ex: ["18", "19", "P22.3"],
              sims: [{ t: "Vòrtexs i Bernoulli", u: "03_fluids_ideals/vortexs_bernoulli.html" }] },
            { id: "ones_sonores", nom: "Ones sonores en un fluid compressible i nombre de Mach M = u/c₀",
              desc: "Linealitzant les equacions de continuïtat i d'Euler per a petites pertorbacions adiabàtiques al voltant del repòs s'obté l'equació d'ones ∂²Δp/∂t² = c₀²∇²Δp amb c₀ = √(∂p/∂ρ)_S. Si M = u/c₀ ≪ 1, el flux es pot tractar com a incompressible.",
              cal: ["eq_euler", "eq_continuitat", "edp_separacio"], veure: ["atenuacio_so"], ex: ["1", "2"],
              sims: [{ t: "Viscositat i Navier-Stokes", u: "04_fluids_newtonians/viscositat_navier_stokes.html" }] }
          ]
        },
        {
          id: "E3_2", tema: "03", nom: "Teorema de Bernoulli, Torricelli i efecte Venturi", curt: "Bernoulli i aplicacions",
          conceptes: [
            { id: "teorema_bernoulli", nom: "Equació de Bernoulli estacionària i no estacionària (H = ½u² + p/ρ + Φ)",
              desc: "Usant la identitat (u·∇)u = ∇(½u²) − u×ω, en un flux estacionari es compleix u·∇H = 0: H és constant al llarg de cada línia de corrent (i a tot el fluid si és irrotacional ω = 0).",
              cal: ["eq_euler", "vorticitat_circulacio"], veure: ["kutta_zhukovsky"], ex: ["17", "18", "19", "P22.3", "P23.2"],
              sims: [{ t: "Vòrtexs i Bernoulli", u: "03_fluids_ideals/vortexs_bernoulli.html" }] },
            { id: "torricelli_venturi", nom: "Llei de Torricelli, buidatge de dipòsits, tub de Pitot i efecte Venturi",
              desc: "Aplicacions directes de Bernoulli i continuïtat: velocitat de sortida v = √(2gh) per un orifici i temps de buidatge segons la geometria r(z), mesura de velocitat per pressió d'estancament (Pitot) i depressió en estrenyiments (Venturi o discos radials).",
              cal: ["teorema_bernoulli", "eq_continuitat"], veure: [], ex: ["17", "18", "P22.3"],
              sims: [{ t: "Vòrtexs i Bernoulli", u: "03_fluids_ideals/vortexs_bernoulli.html" }] }
          ]
        },
        {
          id: "E3_3", tema: "03", nom: "Teorema de Kelvin i dinàmica de vòrtexs", curt: "Kelvin i vòrtexs",
          conceptes: [
            { id: "teorema_kelvin", nom: "Equació de la vorticitat, teorema de Kelvin (DΓ/Dt = 0) i Helmholtz",
              desc: "En un fluid ideal barotròpic amb forces conservatives, Dω/Dt = (ω·∇)u (estirament de tubs de vòrtexs) i la circulació Γ al voltant de qualsevol corba material es conserva en el temps: un flux inicialment irrotacional continua sent irrotacional per sempre.",
              cal: ["eq_euler", "vorticitat_circulacio"], veure: ["difusio_vortex"], ex: ["16"],
              sims: [{ t: "Vòrtexs i Bernoulli", u: "03_fluids_ideals/vortexs_bernoulli.html" }] },
            { id: "vortex_rankine", nom: "Models de vòrtex: lliure irrotacional, Rankine, Kaufmann i Gaussià",
              desc: "El vòrtex lliure u_θ = Γ/(2πr) té ω = 0 fora de l'origen però divergeix a r → 0. El vòrtex de Rankine regularitza el nucli amb rotació rígida (ω = ω₀ per r < a) i flux irrotacional per r > a, formant una superfície lliure parabòlica al nucli i hiperbòlica a l'exterior.",
              cal: ["teorema_bernoulli", "teorema_kelvin", "cilindre_rotacio"], veure: ["difusio_vortex"], ex: ["13", "P23.2"],
              sims: [{ t: "Vòrtexs i Bernoulli", u: "03_fluids_ideals/vortexs_bernoulli.html" }] },
            { id: "interaccio_vortexs", nom: "Interacció de parells de vòrtexs, mètode de les imatges i Biot-Savart",
              desc: "Cada vòrtex puntual és arrossegat per la velocitat induïda pels altres: dos vòrtexs d'igual signe giren al voltant del seu centre de vorticitat; dos de signe oposat (Γ₁ = −Γ₂) es transladen en línia recta a velocitat Γ/(2πd), equivalent a un vòrtex davant d'una paret plana.",
              cal: ["vortex_rankine"], veure: ["kutta_zhukovsky"], ex: ["22"],
              sims: [{ t: "Vòrtexs i Bernoulli", u: "03_fluids_ideals/vortexs_bernoulli.html" }] }
          ]
        }
      ]
    },

    // =========================================================================
    // L4 — FLUX POTENCIAL, POTENCIAL COMPLEX I SUSTENTACIÓ
    // =========================================================================
    {
      id: "L4",
      nom: "Flux potencial, potencial complex i sustentació",
      curt: "Flux potencial i sustentació",
      temes: "Tema 3B",
      color: "#6B21A8",
      desc: "Quan el flux és incompressible i irrotacional (∇×u = 0), la velocitat deriva d'un potencial harmònic ∇²ϕ = 0. Podem superposar solucions elementals per estudiar cilindres, esferes, perfils i la força de sustentació aerodinàmica.",
      estacions: [
        {
          id: "E4_1", tema: "03", nom: "Potencial de velocitats, Laplace i multipols", curt: "Laplace i multipols",
          conceptes: [
            { id: "flux_potencial_laplace", nom: "Potencial de velocitats u = ∇ϕ i equació de Laplace ∇²ϕ = 0",
              desc: "Si ω = ∇×u = 0, existeix ϕ tal que u = ∇ϕ; combinat amb ∇·u = 0 dóna l'equació lineal de Laplace ∇²ϕ = 0 amb condició d'impenetrabilitat ∂ϕ/∂n = U·n sobre contorns sòlids.",
              cal: ["vorticitat_circulacio", "eq_continuitat", "edp_separacio"], veure: ["potencial_complex"], ex: ["3", "4", "16", "20", "23", "P22.2", "P24.2"],
              sims: [
                { t: "Potencial i Kutta-Zhukovsky", u: "03_fluids_ideals/potencial_kutta_zhukovsky.html" },
                { t: "Laboratori 3D de camps", u: "../visualitzador_camps.html" }
              ] },
            { id: "fonts_dipols", nom: "Fonts, embornals, doblets (dipols 2D i 3D) i òval de Rankine",
              desc: "Solucions fonamentals de Laplace: font/embornal (ϕ = (m/2π) ln r en 2D; ϕ = −m/(4πr) en 3D) i el seu límit dipolar quan una font i un embornal s'aproximen. Superposats amb un corrent uniforme U generen cossos tancats com l'òval de Rankine, el cilindre o l'esfera.",
              cal: ["flux_potencial_laplace"], veure: [], ex: ["23", "24", "P19.3"],
              sims: [{ t: "Potencial i Kutta-Zhukovsky", u: "03_fluids_ideals/potencial_kutta_zhukovsky.html" }] }
          ]
        },
        {
          id: "E4_2", tema: "03", nom: "Flux sobre cilindre i esfera, paradoxa de d'Alembert i massa afegida", curt: "Cilindre, esfera i massa afegida",
          conceptes: [
            { id: "cilindre_dalembert", nom: "Flux al voltant d'un cilindre o esfera i paradoxa de d'Alembert",
              desc: "Sumant un corrent uniforme i un dipol s'obté ϕ = U(r + a²/r) cos θ (cilindre 2D) o ϕ = U(r + a³/(2r²)) cos θ (esfera 3D). La pressió de Bernoulli és simètrica davant-darrere i dóna força d'arrossegament nul·la (F = 0, paradoxa de d'Alembert), fins que en un fluid real es produeix la separació de la capa límit.",
              cal: ["fonts_dipols", "teorema_bernoulli"], veure: ["kutta_zhukovsky"], ex: ["21", "P19.3"],
              sims: [{ t: "Potencial i Kutta-Zhukovsky", u: "03_fluids_ideals/potencial_kutta_zhukovsky.html" }] },
            { id: "massa_afegida", nom: "Moviment accelerat d'un cos en un fluid i massa afegida M_f",
              desc: "Encara que a velocitat constant la força neta sigui nul·la, per accelerar un cilindre o una esfera cal augmentar l'energia cinètica del fluid circumdant E_c = ½ M_f U², de manera que el fluid exerceix una força de reacció −M_f dU/dt (M_f = ρπa²L pel cilindre; M_f = ½(4/3 πa³ρ) per l'esfera).",
              cal: ["cilindre_dalembert"], veure: [], ex: ["21", "P19.3"],
              sims: [{ t: "Potencial i Kutta-Zhukovsky", u: "03_fluids_ideals/potencial_kutta_zhukovsky.html" }] }
          ]
        },
        {
          id: "E4_3", tema: "03", nom: "Potencial complex w(z) i teorema de Kutta-Zhukovsky", curt: "Potencial complex i Magnus",
          conceptes: [
            { id: "potencial_complex", nom: "Potencial complex w(z) = ϕ + iψ, Cauchy-Riemann i flux en diedres",
              desc: "Qualsevol funció analítica w(z) de z = x + iy té parts real i imaginària que compleixen Cauchy-Riemann (∂_x ϕ = ∂_y ψ = u, ∂_y ϕ = −∂_x ψ = v) i són harmòniques. La derivada dw/dz = u − iv és la velocitat complexa; les potències w(z) = Az^n descriuen fluxos en cantonades i diedres d'angle π/n.",
              cal: ["funcio_corrent", "flux_potencial_laplace"], veure: [], ex: ["20", "23", "25", "26", "27", "P24.2"],
              sims: [
                { t: "Potencial i Kutta-Zhukovsky", u: "03_fluids_ideals/potencial_kutta_zhukovsky.html" },
                { t: "Laboratori 3D de camps", u: "../visualitzador_camps.html" }
              ] },
            { id: "kutta_zhukovsky", nom: "Cilindre amb circulació Γ, efecte Magnus i teorema de Kutta-Zhukovsky",
              desc: "Afegint un vòrtex de circulació Γ al flux al voltant d'un cilindre, la velocitat augmenta en un costat i disminueix a l'altre. Els punts d'estancament es desplacen segons sin θ = −Γ/(4πRU) i la integració de la pressió (o el teorema de Blasius) dóna la força de sustentació F_y = −ρUΓ perpendicular al corrent.",
              cal: ["cilindre_dalembert", "interaccio_vortexs", "potencial_complex"], veure: [], ex: ["22"],
              sims: [{ t: "Potencial i Kutta-Zhukovsky", u: "03_fluids_ideals/potencial_kutta_zhukovsky.html" }] }
          ]
        }
      ]
    },

    // =========================================================================
    // L5 — FLUIDS NEWTONIANS, VISCOSITAT I EQUACIONS DE BALANÇ
    // =========================================================================
    {
      id: "L5",
      nom: "Fluids newtonians, Navier-Stokes i dissipació",
      curt: "Viscositat i Navier-Stokes",
      temes: "Tema 4",
      color: "#991B1B",
      desc: "Als fluids reals hi ha fricció interna quan existeix un gradient de velocitats: apareixen esforços tangencials, la condició de no-lliscament a les parets, la difusió viscosa de la vorticitat i la dissipació irreversible d'energia.",
      estacions: [
        {
          id: "E5_1", tema: "04", nom: "Viscositat, Navier-Stokes i fluxos estacionaris en conductes", curt: "Couette i Poiseuille",
          conceptes: [
            { id: "llei_newton_viscosa", nom: "Llei de Newton de la viscositat (τ = η du/dy), condició de no-lliscament i Navier-Stokes",
              desc: "L'esforç tallant és proporcional al gradient de velocitats amb coeficient η (viscositat dinàmica) i ν = η/ρ (viscositat cinemàtica). Sobre una paret sòlida el fluid s'adhereix (u = U_paret) i l'equació de moviment passa a ser ρ Du/Dt = −∇p + ρf + η∇²u.",
              cal: ["tensor_deformacio", "eq_euler"], veure: ["tensor_esforcos"], ex: [],
              sims: [{ t: "Viscositat i Navier-Stokes", u: "04_fluids_newtonians/viscositat_navier_stokes.html" }] },
            { id: "couette_poiseuille", nom: "Flux de Couette pla, Poiseuille pla i llei de Hagen-Poiseuille cilíndrica (Q ∝ a⁴)",
              desc: "Solucions estacionàries unidireccionals exactes: perfil lineal u(y) = U y/h arrossegat per una paret mòbil (Couette), perfil parabòlic impulsat per un gradient de pressió G = dp/dx entre plaques planes o dins d'un tub cilíndric de radi a amb cabal Q = −πa⁴G/(8η).",
              cal: ["llei_newton_viscosa"], veure: ["dissipacio_entropia"], ex: [],
              sims: [{ t: "Viscositat i Navier-Stokes", u: "04_fluids_newtonians/viscositat_navier_stokes.html" }] }
          ]
        },
        {
          id: "E5_2", tema: "04", nom: "Fluxos viscosos no estacionaris i fluxos circulars", curt: "Problemes de Stokes i vòrtexs",
          conceptes: [
            { id: "problemes_stokes", nom: "Primer i segon problema de Stokes: difusió viscosa (√(νt)) i paret oscil·lant",
              desc: "Quan una paret plana es posa en moviment impulsiu a t = 0 (1r problema de Stokes), el perfil u(y,t) = V₀[1 − erf(y/(2√(νt)))] obeeix l'equació de difusió ∂_t u = ν ∂²_y u i la capa en moviment creix com √(νt). Si la paret oscil·la com U cos(ωt) (2n problema), es propaga una ona transversal esmorteïda amb longitud de penetració δ = √(2ν/ω).",
              cal: ["llei_newton_viscosa", "edp_separacio"], veure: [], ex: [],
              sims: [{ t: "Viscositat i Navier-Stokes", u: "04_fluids_newtonians/viscositat_navier_stokes.html" }] },
            { id: "difusio_vortex", nom: "Flux de Taylor-Couette i decaïment viscós d'un vòrtex (Lamb-Oseen)",
              desc: "Entre dos cilindres concèntrics en rotació, el perfil estacionari combina rotació sòlida i vòrtex irrotacional: u(r) = Ar + B/r. En canvi, un vòrtex lliure inicial en un fluid viscós difon la seva vorticitat des de l'origen segons u_θ(r,t) = (Γ₀/2πr)(1 − exp(−r²/(4νt))) i ω_z = (Γ₀/4πνt) exp(−r²/(4νt)).",
              cal: ["llei_newton_viscosa", "vortex_rankine"], veure: [], ex: ["P23.2"],
              sims: [{ t: "Viscositat i Navier-Stokes", u: "04_fluids_newtonians/viscositat_navier_stokes.html" }] }
          ]
        },
        {
          id: "E5_3", tema: "04", nom: "Dissipació, atenuació del so i fluids no newtonians", curt: "Dissipació i reologia",
          conceptes: [
            { id: "dissipacio_entropia", nom: "Balanç d'energia, escalfament viscós en Couette i producció d'entropia",
              desc: "El treball de les forces viscoses es transforma irreversiblement en energia interna a ritme w_irr = ζ(∇·u)² + (1/2η)σ'_ij σ'_ij ≥ 0 (segona llei: η > 0, ζ > 0). En un flux de Couette amb parets a T₀ genera un perfil parabòlic de temperatura amb màxim ΔT_m = ηU²/(8k).",
              cal: ["couette_poiseuille", "tensor_esforcos"], veure: [], ex: [],
              sims: [{ t: "Viscositat i Navier-Stokes", u: "04_fluids_newtonians/viscositat_navier_stokes.html" }] },
            { id: "atenuacio_so", nom: "Atenuació viscosa del so i comportament de fluids no newtonians",
              desc: "La viscositat afegeix un terme dissipatiu a l'equació d'ones acústiques i esmorteeix el so amb un coeficient κ ∝ ω²/(ω₀c₀) molt més intens a alta freqüència. Fora del règim newtonià, la viscositat aparent η_a = τ/γ̇ pot créixer (dilatants), disminuir (pseudoplàstics), requerir un esforç llindar τ₀ (plàstics de Bingham) o presentar memòria viscoelàstica (model de Maxwell).",
              cal: ["ones_sonores", "dissipacio_entropia"], veure: [], ex: [],
              sims: [{ t: "Viscositat i Navier-Stokes", u: "04_fluids_newtonians/viscositat_navier_stokes.html" }] }
          ]
        }
      ]
    },

    // =========================================================================
    // T — EINES TRANSVERSALS: CAMPS, EDP I EQUACIONS DE BALANÇ
    // =========================================================================
    {
      id: "T",
      nom: "Eines transversals: camps vectorials, EDP i teoremes de balanç",
      curt: "Camps, EDP i balanç",
      temes: "Transversal (Full 1 i Tema 4B)",
      color: "#475569",
      desc: "L'aparell matemàtic i físic que sosté totes les línies del curs: operadors diferencials en cartesianes, cilíndriques i esfèriques, separació de variables, el teorema de transport de Reynolds i el tensor d'esforços de Cauchy.",
      estacions: [
        {
          id: "ET_1", tema: "00", nom: "Càlcul vectorial i equacions en derivades parcials", curt: "Camps i EDP",
          conceptes: [
            { id: "camps_escalars_vectorials", nom: "Gradient, divergència, rotacional i laplacià en coordenades curvilínies",
              desc: "Domini dels operadors ∇f, ∇·u, ∇×u i ∇² en coordenades cartesianes, cilíndriques (r,θ,z) i esfèriques (r,θ,ϕ), indispensables per plantejar les equacions d'Euler i Navier-Stokes segons la simetria del problema.",
              cal: [], veure: ["eq_hidrostatica", "euler_lagrange"], ex: ["12", "13", "14", "16", "23"],
              sims: [{ t: "Laboratori 3D de camps", u: "../visualitzador_camps.html" }] },
            { id: "edp_separacio", nom: "Separació de variables per a l'equació d'ones i l'equació de Laplace",
              desc: "Resolució d'equacions en derivades parcials lineals (corda vibrant, membrana circular amb funcions de Bessel, equació de Laplace en dominis rectangulars o polars) imposant les condicions de contorn i inicials.",
              cal: ["camps_escalars_vectorials"], veure: ["ones_sonores", "flux_potencial_laplace"], ex: ["1", "2", "3", "4", "20"],
              sims: [{ t: "Laboratori 3D de camps", u: "../visualitzador_camps.html" }] }
          ]
        },
        {
          id: "ET_2", tema: "04", nom: "Teorema de Reynolds i tensor d'esforços de Cauchy", curt: "Reynolds i Cauchy",
          conceptes: [
            { id: "teorema_reynolds", nom: "Teorema del transport de Reynolds i estructura general d'una llei de balanç",
              desc: "Relaciona la derivada temporal de la integral d'una magnitud F sobre un volum material en moviment V*(t) amb la integral sobre un volum fix: d/dt ∫ ρf dV = ∫ ρ Df/Dt dV. Permet passar de les lleis de conservació globals (massa, moment lineal, moment angular, energia i entropia) a les equacions diferencials locals.",
              cal: ["euler_lagrange", "eq_continuitat"], veure: ["tensor_esforcos"], ex: ["17", "18"],
              sims: [{ t: "Viscositat i Navier-Stokes", u: "04_fluids_newtonians/viscositat_navier_stokes.html" }] },
            { id: "tensor_esforcos", nom: "Tensor d'esforços T_ij, equació de Cauchy i simetria pel moment angular",
              desc: "La força superficial a través d'un element d'àrea amb normal n és T(n) = n·T. Aplicant el balanç de moment lineal s'obté l'equació de Cauchy ρ Du/Dt = ρf + ∇·T, i el balanç de moment angular demostra que en medis no polars el tensor d'esforços és simètric (T_ij = T_ji = −pδ_ij + σ_ij).",
              cal: ["forces_vol_sup", "teorema_reynolds"], veure: ["llei_newton_viscosa", "dissipacio_entropia"], ex: [],
              sims: [{ t: "Viscositat i Navier-Stokes", u: "04_fluids_newtonians/viscositat_navier_stokes.html" }] }
          ]
        }
      ]
    }
  ]
};

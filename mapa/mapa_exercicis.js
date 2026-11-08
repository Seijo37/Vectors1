// mapa_exercicis.js — Exercicis dels fulls de problemes i exàmens parcials de Fluids i Superfluids (UAB)
// Recopilats i enllaçats per Joan Puertas Buscallà.
var EXERCICIS = [
  // Full 1: EDP i Separació de variables
  { num: "1", tema: "00", titol: "Corda vibrant per separació de variables (f(x) = h sin x + k sin 2x)", web: "../visualitzador_camps.html" },
  { num: "2", tema: "00", titol: "Membrana circular i equació d'ones en coordenades polars", web: "../visualitzador_camps.html" },
  { num: "3", tema: "00", titol: "Equació de Laplace en un rectangle (−a < x < a, 0 < y < a)", web: "../visualitzador_camps.html" },
  { num: "4", tema: "00", titol: "Flux potencial sobre un pla amb protuberància semicircular (ϕ → Ar² cos 2θ)", web: "../simuladors/03_fluids_ideals/potencial_kutta_zhukovsky.html" },

  // Full 2: Estàtica de fluids
  { num: "5", tema: "01", titol: "Recipient cúbic amb acceleració lineal constant a: superfície lliure inclinada", web: "../simuladors/01_medis_continus/hidrostatica_no_inercial.html" },
  { num: "6", tema: "01", titol: "Cilindre en rotació Ω amb un i dos líquids immiscibles (ρ₁, ρ₂): paraboloides", web: "../simuladors/01_medis_continus/hidrostatica_no_inercial.html" },
  { num: "7", tema: "01", titol: "Forces i moments de pressió sobre un recipient semiesfèric amb cara vertical", web: "../simuladors/01_medis_continus/hidrostatica_no_inercial.html" },
  { num: "8", tema: "01", titol: "Barrera flotant semicircular contenint un vessament d'oli al port (h₁, h₂ i força)", web: "../simuladors/01_medis_continus/hidrostatica_no_inercial.html" },
  { num: "9", tema: "01", titol: "Massa de gas autogravitant amb equació politròpica p = Cρ^(1+1/n) (n=0 i n=1)", web: "../simuladors/01_medis_continus/hidrostatica_no_inercial.html" },

  // Full 4: Cinemàtica
  { num: "12", tema: "02", titol: "Flux hiperbòlic u = (ax, −ay, 0): descripció lagrangiana vs euleriana i derivada material", web: "../visualitzador_camps.html" },
  { num: "13", tema: "02", titol: "Vòrtex rígid u = (−3y, 3x, 0): funció de corrent ψ = −3/2(x²+y²) i vorticitat ω_z = 6", web: "../visualitzador_camps.html" },
  { num: "14", tema: "02", titol: "Flux tridimensional lagrangià r(t) = (x₀e^(−2t/s), y₀e^(t/s), z₀e^(t/s)) i incompressibilitat", web: "../visualitzador_camps.html" },
  { num: "15", tema: "02", titol: "Comparació de línies de corrent, trajectòries i streaklines en fluxos no estacionaris", web: "../simuladors/02_cinematica/cinematica_deformacio.html" },
  { num: "16", tema: "02", titol: "Camp lineal u = αx + 2y, v = βx − 3y: circulació de Stokes, potencial ϕ, ψ i tensor S_ij", web: "../simuladors/02_cinematica/cinematica_deformacio.html" },

  // Full 5: Fluid ideal, equacions de balanç i teoria potencial
  { num: "17", tema: "03", titol: "Buidatge de dipòsit esfèric, cilíndric i clepsidra r = az^n per la llei de Torricelli", web: "../simuladors/03_fluids_ideals/vortexs_bernoulli.html" },
  { num: "18", tema: "03", titol: "Premsa hidràulica i oscil·lacions no estacionàries entre dos dipòsits (Euler integrat)", web: "../simuladors/03_fluids_ideals/vortexs_bernoulli.html" },
  { num: "19", tema: "03", titol: "Col·lapse d'una cavitat esfèrica buida de radi a₀ en un fluid ideal infinit (Rayleigh)", web: "../simuladors/03_fluids_ideals/vortexs_bernoulli.html" },
  { num: "20", tema: "03", titol: "Flux potencial estacionari en un diedre d'angle α a partir de l'equació de Laplace", web: "../simuladors/03_fluids_ideals/potencial_kutta_zhukovsky.html" },
  { num: "21", tema: "03", titol: "Moviment d'un cilindre de radi a en un fluid ideal: potencial, camp i paradoxa de d'Alembert", web: "../simuladors/03_fluids_ideals/potencial_kutta_zhukovsky.html" },
  { num: "22", tema: "03", titol: "Cilindre amb circulació ϕ = −kθ + (1+R²/r²)rv₀ cos θ: punts d'estancament, p(θ) i sustentació", web: "../simuladors/03_fluids_ideals/potencial_kutta_zhukovsky.html" },
  { num: "23", tema: "03", titol: "Famílies de funcions potencials ϕ, de corrent ψ i potencials complexos w(z) (a–g)", web: "../visualitzador_camps.html" },
  { num: "24", tema: "03", titol: "Corrent uniforme U + font en (−a,0) + embornal en (a,0) (òval de Rankine i límit dipolar)", web: "../simuladors/03_fluids_ideals/potencial_kutta_zhukovsky.html" },
  { num: "25", tema: "03", titol: "Flux a la boca d'un tub pel potencial implícit z = w + e^w (contorn de Borda)", web: "../simuladors/03_fluids_ideals/potencial_kutta_zhukovsky.html" },
  { num: "26", tema: "03", titol: "Flux a través d'una obertura pel potencial w(z) = arcosh(z) amb línies hiperbòliques", web: "../simuladors/03_fluids_ideals/potencial_kutta_zhukovsky.html" },
  { num: "27", tema: "03", titol: "Flux en cantonada w(z) = iCz²: camp de velocitats, trajectòria x(t), y(t) i circulació", web: "../simuladors/03_fluids_ideals/potencial_kutta_zhukovsky.html" },

  // Exàmens parcials (2019, 2022, 2023, 2024)
  { num: "P19.1", tema: "02", titol: "Parcial 2019/2023 Ex.1: Camp 3D v = (c(y²+z²), 2cxy, −2cxz), tensor S_ij i línies de vorticitat", web: "../visualitzador_camps.html" },
  { num: "P19.2", tema: "01", titol: "Parcial 2019 Ex.2: Tub en U amb mercuri i aigua, oscil·lacions i acceleròmetre lineal", web: "../simuladors/01_medis_continus/hidrostatica_no_inercial.html" },
  { num: "P19.3", tema: "03", titol: "Parcial 2019/2023 Ex.3: Font 3D, dipol esfèric, flux sobre esfera de radi a i massa afegida M_f", web: "../simuladors/03_fluids_ideals/potencial_kutta_zhukovsky.html" },
  { num: "P22.1", tema: "01", titol: "Parcial 2022 Ex.1: Comporta rígida en forma de L i profunditat crítica d'obertura automàtica", web: "../simuladors/01_medis_continus/hidrostatica_no_inercial.html" },
  { num: "P22.2", tema: "02", titol: "Parcial 2022 Ex.2: Camp u = 2Cxy, v = C(a²+x²−y²), potencial ϕ, funció de corrent ψ i S_ij", web: "../visualitzador_camps.html" },
  { num: "P22.3", tema: "03", titol: "Parcial 2022/2024 Ex.3: Flux radial entre dos discos des d'un dipòsit pressuritzat i força d'atracció", web: "../simuladors/03_fluids_ideals/vortexs_bernoulli.html" },
  { num: "P23.2", tema: "03", titol: "Parcial 2023 Ex.2: Vòrtex de Rankine (ω₀ constant per r < a, nul per r > a), pressió i superfície lliure", web: "../simuladors/03_fluids_ideals/vortexs_bernoulli.html" },
  { num: "P24.1", tema: "01", titol: "Parcial 2024 Ex.1: Globus d'heli lligat al fons d'un dipòsit d'aigua accelerat a 5 m/s²", web: "../simuladors/01_medis_continus/hidrostatica_no_inercial.html" },
  { num: "P24.2", tema: "03", titol: "Parcial 2024 Ex.2: Funció de corrent ψ = 3x²y − y³ (flux hexapolar), potencial ϕ i |u| = 3r²", web: "../visualitzador_camps.html" }
];

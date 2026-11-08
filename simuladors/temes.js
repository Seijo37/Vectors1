// temes.js — Dades compartides dels temes de Fluids i Superfluids (Grau en Física · UAB)
// Autor: Joan Puertas Buscallà — Basat en l'estructura web del prof. F. Xavier Àlvarez (estat_solid).

var ICONES = {
  "00": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 18 L10 12 M8 12 L10 12 L10 14"/><path d="M12 18 L19 9 M16 9 L19 9 L19 12"/><path d="M4 9 L12 6 M10 5 L12 6 L10.5 8"/><circle cx="4" cy="18" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="18" r="1.3" fill="currentColor" stroke="none"/><circle cx="4" cy="9" r="1.3" fill="currentColor" stroke="none"/></svg>`,
  "01": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 5 L4 19 L20 19 L20 5"/><path d="M4 10 Q12 17 20 10" stroke-width="1.8"/><line x1="7" y1="15" x2="17" y2="15" stroke-dasharray="1.5 2" opacity=".6"/></svg>`,
  "02": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 8 C8 4, 16 12, 21 8"/><path d="M3 13 C8 9, 16 17, 21 13"/><path d="M3 18 C8 14, 16 22, 21 18"/><polygon points="7,10 11,9 12,13 8,14" stroke-width="1.3" fill="currentColor" fill-opacity=".18"/></svg>`,
  "03": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M2 8 Q7 8 9 5.5 Q12 3 15 5.5 Q17 8 22 8"/><path d="M2 16 Q7 16 9 18.5 Q12 21 15 18.5 Q17 16 22 16"/><path d="M12 6.2 L13.8 7.5 L12 8.8" stroke-width="1.3"/></svg>`,
  "04": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="3" y1="4" x2="21" y2="4" stroke-width="2"/><line x1="3" y1="20" x2="21" y2="20" stroke-width="2"/><path d="M6 4 Q18 12 6 20" stroke-dasharray="1.5 1.5" opacity=".7"/><line x1="6" y1="8" x2="12.5" y2="8"/><line x1="6" y1="12" x2="15" y2="12"/><line x1="6" y1="16" x2="12.5" y2="16"/></svg>`
};

var TEMES = [
  {num:"00", nom:"Camps vectorials i equacions en derivades parcials", etiqueta:"BASE", carpeta:"00_camps_edp", simuladors:[
    {nom:"Laboratori 3D i 2D de camps vectorials (u, v, w), potencial φ i funció de corrent ψ", href:"../visualitzador_camps.html",
     desc:"Visualitzador interactiu WebGL (Three.js) en 3D i pla 2D. Permet definir qualsevol camp (u,v,w), funció potencial φ(x,y) o funció de corrent ψ(x,y), comprovar la incompressibilitat (∇·u = 0), la irrotacionalitat (ω_z = 0), les equacions de Laplace i Cauchy-Riemann, i explorar tots els exercicis dels fulls de problemes i exàmens parcials."}
  ]},
  {num:"01", nom:"Medis continus i hidrostàtica", carpeta:"01_medis_continus", simuladors:[
    {nom:"Hidrostàtica: sistemes accelerats, cilindre en rotació i flotació d'Arquimedes", href:"01_medis_continus/hidrostatica_no_inercial.html",
     desc:"Explora l'equació fonamental −∇p + ρf_ef = 0 en quatre sistemes clàssics del curs: (1) dipòsit amb acceleració lineal a_x i globus d'heli lligat al fons (Parcial Nov 2024 i Probl. 5), (2) cilindre en rotació Ω amb un o dos líquids immiscibles ρ₁, ρ₂ formant paraboloides de revolució (Probl. 6), (3) tub en U amb dos líquids i acceleròmetre (Parcial Nov 2019), i (4) barrera flotant per a vessament d'oli (Probl. 8)."}
  ]},
  {num:"02", nom:"Cinemàtica dels fluids i deformació", carpeta:"02_cinematica", simuladors:[
    {nom:"Línies de corrent, trajectòries, línies de traçat (streaklines) i tensor de deformació S_ij", href:"02_cinematica/cinematica_deformacio.html",
     desc:"Compara en temps real les línies de corrent (streamlines), les trajectòries lagrangianes (pathlines) i les línies de traçat d'un colorant injectat (streaklines) per als fluxos no estacionaris del Problema 15 i de teoria. A la segona vista, segueix un element quadrat de fluid i descompon ∇u = S + R en deformació pura (eixos principals de S_ij), dilatació volumètrica (∇·u) i rotació rígida amb vorticitat ω_z (Problemes 12–16 i Parcials 2019/2023)."}
  ]},
  {num:"03", nom:"Fluids ideals, dinàmica de vòrtexs i flux potencial", carpeta:"03_fluids_ideals", simuladors:[
    {nom:"Dinàmica de vòrtexs (Rankine, Kaufmann, Gaussià), parells de vòrtexs i buidatge de Torricelli", href:"03_fluids_ideals/vortexs_bernoulli.html",
     desc:"Compara els perfils de velocitat u_θ(r), vorticitat ω_z(r), pressió p(r) i depressió de la superfície lliure z(r) d'un vòrtex lliure irrotacional, de Rankine (Parcial Nov 2023), de Kaufmann i Gaussià. Simula també la interacció de dos vòrtexs puntuals (Γ₁, Γ₂), el mètode de les imatges davant d'una paret plana i el buidatge de recipients esfèric, cilíndric i clepsidra r = a z^n per la llei de Torricelli (Problema 17)."},
    {nom:"Flux potencial, potencial complex w(z) i teorema de Kutta-Zhukovsky (Efecte Magnus)", href:"03_fluids_ideals/potencial_kutta_zhukovsky.html",
     desc:"Superposa flux uniforme, doblet i vòrtex per estudiar el cilindre amb circulació Γ (Problemes 21 i 22), l'esfera 3D amb dipol i massa afegida (Parcials 2019 i 2023), l'òval de Rankine font+embornal (Problema 24) i el flux en diedres w(z) = A z^n (Problema 20). Mostra les línies de corrent ψ i equipotencials φ, mou els punts d'estancament segons α = Γ/(2πRv₀), representa el diagrama polar de pressió C_p(θ) de Bernoulli i verifica la força de sustentació F_y = −ρ U Γ."}
  ]},
  {num:"04", nom:"Fluids newtonians, viscositat i Navier-Stokes", carpeta:"04_fluids_newtonians", simuladors:[
    {nom:"Fluxos viscosos de Couette, Poiseuille, problemes de Stokes, vòrtex de Lamb-Oseen i reologia", href:"04_fluids_newtonians/viscositat_navier_stokes.html",
     desc:"Resol i visualitza les solucions exactes de Navier-Stokes del Tema 4: (1) canal pla de Couette-Poiseuille amb esforç tallant τ(y) i perfil d'escalfament viscós ΔT(y), (2) conducte cilíndric de Hagen-Poiseuille (Q ∝ a⁴), (3) primer problema de Stokes (paret impulsiva, δ ~ √(νt)) i segon problema de Stokes (paret oscil·lant amb ona transversal esmorteïda δ = √(2ν/ω)), (4) difusió viscosa d'un vòrtex de Lamb-Oseen i flux de Taylor-Couette, i (5) corbes reològiques τ(γ̇) per a fluids newtonians, dilatants, pseudoplàstics i plàstics de Bingham."}
  ]}
];

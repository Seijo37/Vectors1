import plotly.graph_objects as go
import numpy as np
import os
import subprocess

# ==============================================================
# 1. DEFINEIX EL TEU CAMP VECTORIAL AQUÍ (Equacions de Fluids)
# ==============================================================
def definir_camp(x, y, z):
    """
    Sol·licita a l'usuari que introdueixi les equacions des de la terminal.
    Utilitza 'eval' per calcular els vectors a partir del text.
    """
    print("\n" + "="*50)
    print(" *** SIMULADOR DE FLUIDS 3D - ENTRADA DE DADES ***")
    print("="*50)
    print("Introdueix les fórmules per a cada component.")
    print("Usa les variables 'x', 'y', 'z'.")
    print("Pots utilitzar 'np' per a funcions (ex: np.sin(x), x**2, np.sqrt(z)).")
    print("(Si ho deixes en blanc, s'utilitzarà l'exemple per defecte)")
    print("-" * 50)
    
    eq_u = input("u(x, y, z) = ") or "-y"
    eq_v = input("v(x, y, z) = ") or "x"
    eq_w = input("w(x, y, z) = ") or "z * 0.5"
    
    print("\nProcessant i generant el gràfic...")
    
    # Ambient segur per avaluar expressions amb només les nostres variables
    locals_dict = {'x': x, 'y': y, 'z': z, 'np': np}
    
    try:
        u = eval(eq_u, {"__builtins__": None}, locals_dict)
        v = eval(eq_v, {"__builtins__": None}, locals_dict)
        w = eval(eq_w, {"__builtins__": None}, locals_dict)
        
        # Si l'usuari posa un número constant (ex: "0"), ho convertim a una matriu de la mateixa mida
        if isinstance(u, (int, float)): u = np.full_like(x, float(u))
        if isinstance(v, (int, float)): v = np.full_like(y, float(v))
        if isinstance(w, (int, float)): w = np.full_like(z, float(w))
        
        return u, v, w
    except Exception as e:
        print(f"\n[!] Error a l'avaluar les equacions: {e}")
        print("    -> Es carregarà el camp per defecte (-y, x, z*0.5).")
        return -y, x, z * 0.5

# ==============================================================
# 2. CONFIGURACIÓ DEL DOMINI ESPACIAL
# ==============================================================
LIM = 5       # Límits de l'eix (des de -LIM fins a LIM)
PUNTS = 10    # Densitat de vectors (resolució de la graella)

# ==============================================================
# 3. MOTOR DE RENDERITZAT (No cal tocar-lo)
# ==============================================================
def create_vector_field():
    # Creem una graella de punts 3D
    x, y, z = np.meshgrid(
        np.linspace(-LIM, LIM, PUNTS),
        np.linspace(-LIM, LIM, PUNTS),
        np.linspace(-LIM, LIM, PUNTS)
    )

    # Obtenim les velocitats a cada punt cridant a la teva funció
    u, v, w = definir_camp(x, y, z)

    # --- 1. Camp Vectorial Complet i Separats ---
    # En 3D utilitzem Cone. Com has vist, Arrow no existeix en 3D a Plotly.
    trace_camp_all = go.Cone(
        x=x.flatten(), y=y.flatten(), z=z.flatten(),
        u=u.flatten(), v=v.flatten(), w=w.flatten(),
        colorscale='Viridis', sizemode="absolute", sizeref=1,
        name='Camp Complet', visible=True
    )
    
    trace_camp_x = go.Cone(
        x=x.flatten(), y=y.flatten(), z=z.flatten(),
        u=u.flatten(), v=np.zeros_like(v.flatten()), w=np.zeros_like(w.flatten()),
        colorscale='Reds', sizemode="absolute", sizeref=0.6,
        name='Només X', visible=False
    )
    
    trace_camp_y = go.Cone(
        x=x.flatten(), y=y.flatten(), z=z.flatten(),
        u=np.zeros_like(u.flatten()), v=v.flatten(), w=np.zeros_like(w.flatten()),
        colorscale='Greens', sizemode="absolute", sizeref=0.6,
        name='Només Y', visible=False
    )
    
    trace_camp_z = go.Cone(
        x=x.flatten(), y=y.flatten(), z=z.flatten(),
        u=np.zeros_like(u.flatten()), v=np.zeros_like(v.flatten()), w=w.flatten(),
        colorscale='Blues', sizemode="absolute", sizeref=0.6,
        name='Només Z', visible=False
    )

    # --- 2. Vectors Base (x, y, z) de mòdul 1 ---
    # Per simular Arrows dibuixem el cos del vector (línia) i la punta (Con).
    trace_base_lines = go.Scatter3d(
        x=[0, 1, None, 0, 0, None, 0, 0],
        y=[0, 0, None, 0, 1, None, 0, 0],
        z=[0, 0, None, 0, 0, None, 0, 1],
        mode='lines',
        line=dict(color='black', width=6),
        name='Base i, j, k',
        showlegend=False
    )
    
    trace_base_cons = go.Cone(
        x=[1, 0, 0], y=[0, 1, 0], z=[0, 0, 1],
        u=[1, 0, 0], v=[0, 1, 0], w=[0, 0, 1],
        colorscale=[[0, 'black'], [1, 'black']],
        showscale=False,
        sizemode="absolute",
        sizeref=0.15,
        anchor="tip",
        name='Puntes Base'
    )

    fig = go.Figure(data=[
        trace_base_lines, trace_base_cons,   # Sempre visibles
        trace_camp_all,                      # Mostrar tot (per defecte)
        trace_camp_x,                        # Només component u
        trace_camp_y,                        # Només component v
        trace_camp_z                         # Només component w
    ])

    fig.update_layout(
        title="Simulador de Camps de Fluids 3D",
        scene=dict(
            xaxis_title='Eix X',
            yaxis_title='Eix Y',
            zaxis_title='Eix Z'
        ),
        updatemenus=[
            dict(
                type="buttons",
                direction="down",
                x=0.01,
                y=0.99,
                showactive=True,
                buttons=list([
                    dict(label="Totes les components",
                         method="update",
                         args=[{"visible": [True, True, True, False, False, False]}]),
                    dict(label="Només Component X (u)",
                         method="update",
                         args=[{"visible": [True, True, False, True, False, False]}]),
                    dict(label="Només Component Y (v)",
                         method="update",
                         args=[{"visible": [True, True, False, False, True, False]}]),
                    dict(label="Només Component Z (w)",
                         method="update",
                         args=[{"visible": [True, True, False, False, False, True]}]),
                ]),
            )
        ]
    )

    # Exportem a HTML i obrim
    script_dir = os.path.dirname(os.path.abspath(__file__))
    html_file = os.path.join(script_dir, "camp_vectorial.html")
    fig.write_html(html_file, auto_open=False)
    
    try:
        subprocess.run(f'start "" chrome "{html_file}"', shell=True, check=True)
    except Exception:
        print("No s'ha pogut obrir Chrome. S'obrirà amb el navegador per defecte...")
        try:
            os.startfile(html_file)
        except Exception:
            import webbrowser
            webbrowser.open('file://' + html_file)
            
    print(f"Plot interactiu generat a '{html_file}'.")

if __name__ == "__main__":
    create_vector_field()

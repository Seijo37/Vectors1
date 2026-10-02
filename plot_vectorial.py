import plotly.graph_objects as go
import numpy as np
import webbrowser
import os

def create_vector_field():
    # Creem una graella de punts 3D
    x, y, z = np.meshgrid(
        np.linspace(-2, 2, 5),
        np.linspace(-2, 2, 5),
        np.linspace(-2, 2, 5)
    )

    # Definim el camp vectorial (per exemple, un camp rotacional)
    u = -y
    v = x
    w = z * 0.5  # Moviment a l'eix z

    # --- Camp Vectorial Original ---
    trace_camp = go.Cone(
        x=x.flatten(),
        y=y.flatten(),
        z=z.flatten(),
        u=u.flatten(),
        v=v.flatten(),
        w=w.flatten(),
        colorscale='Viridis',
        sizemode="absolute",
        sizeref=0.5,
        name='Camp'
    )

    # --- Vectors Base de Mòdul 1 (i, j, k) en negre ---
    # Per fer fletxes ("arrows") en 3D a Plotly s'ha de combinar una línia amb un Con a la punta.
    # Línies des de l'origen fins a (1,0,0), (0,1,0), i (0,0,1)
    trace_base_lines = go.Scatter3d(
        x=[0, 1, None, 0, 0, None, 0, 0],
        y=[0, 0, None, 0, 1, None, 0, 0],
        z=[0, 0, None, 0, 0, None, 0, 1],
        mode='lines',
        line=dict(color='black', width=6),
        name='Línies Base',
        showlegend=False
    )
    
    # Puntes (fletxes) negres situades a (1,0,0), (0,1,0), (0,0,1)
    trace_base_cons = go.Cone(
        x=[1, 0, 0], y=[0, 1, 0], z=[0, 0, 1],
        u=[1, 0, 0], v=[0, 1, 0], w=[0, 0, 1],
        colorscale=[[0, 'black'], [1, 'black']],
        showscale=False,
        sizemode="absolute",
        sizeref=0.15,
        anchor="tip", # La punta acaba just a la coordenada exacta
        name='Puntes Base'
    )

    fig = go.Figure(data=[trace_base_lines, trace_base_cons, trace_camp])

    fig.update_layout(
        title="Camp Vectorial 3D (Interactiu)",
        scene=dict(
            xaxis_title='Eix X',
            yaxis_title='Eix Y',
            zaxis_title='Eix Z'
        )
    )

    # Guardem la figura en un arxiu HTML interactiu sense auto-obrir
    script_dir = os.path.dirname(os.path.abspath(__file__))
    html_file = os.path.join(script_dir, "camp_vectorial.html")
    
    fig.write_html(html_file, auto_open=False)
    file_path = html_file
    
    # Forcem l'obertura a Google Chrome
    import subprocess
    try:
        # 'start "" chrome' és la manera robusta a Windows d'obrir-ho
        subprocess.run(f'start "" chrome "{file_path}"', shell=True, check=True)
    except Exception:
        print("No s'ha pogut obrir Chrome. S'intentarà obrir l'arxiu per defecte...")
        try:
            os.startfile(file_path) # A Windows això obre l'arxiu amb el programa associat
        except Exception:
            import webbrowser
            webbrowser.open('file://' + file_path)
    print(f"S'ha generat el plot interactiu a '{html_file}' i s'ha intentat obrir a Chrome.")

if __name__ == "__main__":
    create_vector_field()

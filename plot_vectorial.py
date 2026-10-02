import plotly.graph_objects as go
import numpy as np

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

    fig = go.Figure(data=go.Cone(
        x=x.flatten(),
        y=y.flatten(),
        z=z.flatten(),
        u=u.flatten(),
        v=v.flatten(),
        w=w.flatten(),
        colorscale='Viridis',
        sizemode="absolute",
        sizeref=0.5
    ))

    fig.update_layout(
        title="Camp Vectorial 3D (Interactiu)",
        scene=dict(
            xaxis_title='Eix X',
            yaxis_title='Eix Y',
            zaxis_title='Eix Z'
        )
    )

    # Guardem la figura en un arxiu HTML interactiu i l'obrim
    # auto_open=True farà que s'obri automàticament al navegador web.
    fig.write_html("camp_vectorial.html", auto_open=True)
    print("S'ha generat el plot interactiu a 'camp_vectorial.html' i s'obrirà al teu navegador.")

if __name__ == "__main__":
    create_vector_field()

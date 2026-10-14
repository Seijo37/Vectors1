import os
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from PIL import Image
import io

def generar_gif_preview(output_path="demo.gif", num_frames=36, fps=14):
    """
    Genera un GIF animat modern i professional del simulador 3D de camps vectorials i fluids.
    """
    print(f"Generant GIF animat ({num_frames} fotogrames)...")
    
    LIM = 3.5
    # 1. Graella de vectors 3D
    N = 5
    x = np.linspace(-LIM, LIM, N)
    y = np.linspace(-LIM, LIM, N)
    z = np.linspace(-LIM, LIM, N)
    X, Y, Z = np.meshgrid(x, y, z)
    
    # Camp: Vòrtex Cilíndric 3D (u = -y, v = x, w = 0.25*z)
    U = -Y
    V = X
    W = 0.25 * Z
    norm = np.sqrt(U**2 + V**2 + W**2) + 1e-5
    
    # Normalitzar per longitud de fletxa uniforme i visual
    U_norm = U / norm * 0.7
    V_norm = V / norm * 0.7
    W_norm = W / norm * 0.7

    # 2. Inicialització de partícules traçadores fluint
    np.random.seed(42)
    num_particles = 220
    # Inicialitzar en cilindres a diferents radis i altures
    radis = np.random.uniform(0.5, 3.2, num_particles)
    angles = np.random.uniform(0, 2*np.pi, num_particles)
    part_x = radis * np.cos(angles)
    part_y = radis * np.sin(angles)
    part_z = np.random.uniform(-LIM, LIM, num_particles)
    
    frames = []
    cmap = plt.cm.plasma

    for f in range(num_frames):
        # Angle de rotació de la càmera (òrbita de 360 graus)
        azim_angle = (f / num_frames) * 360
        elev_angle = 22 + 6 * np.sin(2 * np.pi * f / num_frames)
        
        # Integració de moviment de partícules (Euler step)
        dt = 0.08
        pu = -part_y
        pv = part_x
        pw = 0.25 * part_z
        part_x += pu * dt
        part_y += pv * dt
        part_z += pw * dt
        
        # Respawn de partícules que surten dels límits
        mask_out = (np.abs(part_x) > LIM) | (np.abs(part_y) > LIM) | (np.abs(part_z) > LIM)
        if np.any(mask_out):
            num_respawn = np.sum(mask_out)
            r_new = np.random.uniform(0.6, 2.8, num_respawn)
            a_new = np.random.uniform(0, 2*np.pi, num_respawn)
            part_x[mask_out] = r_new * np.cos(a_new)
            part_y[mask_out] = r_new * np.sin(a_new)
            part_z[mask_out] = np.random.uniform(-LIM*0.8, LIM*0.8, num_respawn)
            
        part_vel = np.sqrt(part_x**2 + part_y**2 + (0.25*part_z)**2)
        part_colors = cmap(np.clip(part_vel / 4.0, 0, 1))

        # Configuració de la figura amb estètica Dark Theme professional
        fig = plt.figure(figsize=(7, 5.2), dpi=90, facecolor='#090d16')
        ax = fig.add_subplot(111, projection='3d', facecolor='#090d16')
        
        # Caixa delimitadora
        ax.set_xlim([-LIM, LIM])
        ax.set_ylim([-LIM, LIM])
        ax.set_zlim([-LIM, LIM])
        
        # Color dels eixos i fons fosc
        ax.xaxis.pane.fill = False
        ax.yaxis.pane.fill = False
        ax.zaxis.pane.fill = False
        ax.xaxis.pane.set_edgecolor('#1e293b')
        ax.yaxis.pane.set_edgecolor('#1e293b')
        ax.zaxis.pane.set_edgecolor('#1e293b')
        
        ax.tick_params(colors='#64748b', labelsize=8)
        ax.set_xlabel('Eix X', color='#94a3b8', fontsize=9, labelpad=-6)
        ax.set_ylabel('Eix Y', color='#94a3b8', fontsize=9, labelpad=-6)
        ax.set_zlabel('Eix Z', color='#94a3b8', fontsize=9, labelpad=-6)
        
        # Dibuixar vectors de la graella 3D
        # Filtrem alguns per no saturar
        ax.quiver(
            X.flatten(), Y.flatten(), Z.flatten(),
            U_norm.flatten(), V_norm.flatten(), W_norm.flatten(),
            color='#10b981', alpha=0.35, length=0.6, normalize=True,
            arrow_length_ratio=0.38, linewidth=0.8
        )
        
        # Dibuixar partícules traçadores fluint (Stream tracers)
        ax.scatter(
            part_x, part_y, part_z,
            c=part_colors, s=18, alpha=0.9, depthshade=True, edgecolors='none'
        )
        
        # Títol estilitzat
        fig.text(0.5, 0.94, 'SIMULADOR DE CAMPS VECTORIALS 3D & FLUIDS',
                 color='#f8fafc', fontsize=11, fontweight='bold', ha='center')
        fig.text(0.5, 0.90, 'Vòrtex Cilíndric 3D | ∇×v ≠ 0 | Traçadors de Flux a temps real',
                 color='#38bdf8', fontsize=8.5, ha='center')
        
        ax.view_init(elev=elev_angle, azim=azim_angle)
        plt.subplots_adjust(left=0.02, right=0.98, top=0.90, bottom=0.04)
        
        # Capturar frame a memòria
        buf = io.BytesIO()
        plt.savefig(buf, format='png', facecolor=fig.get_facecolor(), edgecolor='none', dpi=90)
        plt.close(fig)
        buf.seek(0)
        img = Image.open(buf)
        # Quantitzar paleta per a mida reduïda
        img_quantized = img.convert('P', palette=Image.ADAPTIVE, colors=128)
        frames.append(img_quantized)
        
        if (f + 1) % 6 == 0 or f == num_frames - 1:
            print(f"  Frame {f+1}/{num_frames} renderitzat...")

    # Desar com a GIF
    print(f"Guardant GIF a {output_path}...")
    duration_ms = int(1000 / fps)
    frames[0].save(
        output_path,
        save_all=True,
        append_images=frames[1:],
        optimize=True,
        duration=duration_ms,
        loop=0
    )
    mida_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"GIF generat amb èxit! Mida: {mida_mb:.2f} MB")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    out_file = os.path.join(script_dir, "demo.gif")
    generar_gif_preview(output_path=out_file, num_frames=36, fps=12)

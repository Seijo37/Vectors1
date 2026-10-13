import os
import subprocess
import webbrowser

def obrir_simulador():
    """
    Obre el simulador interactiu de camps vectorials 3D al navegador.
    """
    script_dir = os.path.dirname(os.path.abspath(__file__))
    html_file = os.path.join(script_dir, "visualitzador_camps.html")
    
    print("=" * 60)
    print("  SIMULADOR INTERACTIU DE CAMPS VECTORIALS 3D (Estat Sòlid)")
    print("=" * 60)
    print(f"Obrint el simulador: {html_file}")
    
    try:
        subprocess.run(f'start "" chrome "{html_file}"', shell=True, check=True)
    except Exception:
        print("Chrome no disponible directament. S'obrirà amb el navegador per defecte...")
        try:
            os.startfile(html_file)
        except Exception:
            webbrowser.open('file://' + html_file)
            
    print("Simulador obert amb èxit!")

if __name__ == "__main__":
    obrir_simulador()

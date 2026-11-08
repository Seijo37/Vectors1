# -*- coding: utf-8 -*-
"""
Llançador local de la plataforma web de Fluids i Superfluids (UAB).
Autor: Joan Puertas Buscallà
"""
import os
import webbrowser

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    index_path = os.path.join(base_dir, "index.html")
    url = "file:///" + index_path.replace("\\", "/")
    print(f"Obrint la portada de Fluids i Superfluids: {url}")
    webbrowser.open(url)

if __name__ == "__main__":
    main()

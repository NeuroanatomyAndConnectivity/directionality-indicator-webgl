# Notice

This project is a TypeScript + WebGL2 port of the C++/Qt/OpenGL 3.3
**DirectionalityIndicator** by Sebastian Eichelbaum and the Max Planck
Research Group "Neuroanatomy and Connectivity":

- Upstream repository:
  https://github.com/NeuroanatomyAndConnectivity/DirectionalityIndicator
- Author: Sebastian Eichelbaum (https://www.nemtics.com)
- Original copyright: © 2014–2015 Sebastian Eichelbaum and Max Planck
  Research Group "Neuroanatomy and Connectivity"

The web port translates the upstream's Tier-1 visualization pipeline
(SurfaceLIC + illustrative arrows) into TypeScript + WebGL2. All GLSL
shaders, the `extractRegions` directionality algorithm, the LIC pass
structure, and the arrow geometry are derived directly from the
upstream sources.

## License

This port inherits the upstream's licensing: **GNU Lesser General
Public License v3 or any later version (LGPL-3.0-or-later)**. See the
`LICENSE` and `LICENSE.LESSER` files at the repository root for the
full license text.

You are free to use, modify, and redistribute the software under the
terms of the LGPL. Modifications to the LGPL-licensed code itself
must be released under the same license.

## Citation

If you use this software in academic work, please cite both this port
and the upstream project. A canonical citation for the upstream is
not currently available; reference the upstream repository URL and
the author's professional page (above).

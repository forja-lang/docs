# 📖 Referencia Completa de Funciones Forja GUI

> Listado completo de todas las funciones disponibles en el módulo `gui`.
> Categorizadas por funcionalidad.

## 📐 Layout

| Función | Descripción | Alias |
|---------|-------------|-------|
| `columna(hijos...)` | Contenedor vertical (flex columna) | `col` |
| `fila(hijos...)` | Contenedor horizontal (flex fila) | `row` |
| `pila(hijos...)` | Contenedor en Z (superposición) | `zstack` |
| `panel_dividido(hijo1, hijo2, direccion)` | Panel con separador redimensionable | `split` |
| `desplazable(hijo)` | Contenedor con scroll | `scroll` |
| `grilla(hijos, filas, columnas)` | Grid con posición fija | `grid` |
| `caja_fija(hijo, ancho, alto)` | Caja con tamaño fijo | `sized` |
| `columna_con_gap(hijos, gap, alinear)` | Columna con gap configurable | `column_with_gap` |
| `fila_con_gap(hijos, gap, alinear)` | Fila con gap configurable | `row_with_gap` |
| `flujo(hijos, gap)` | Flow layout con wrap automático | `flow_layout`, `flow` |
| `caja_relativa(hijo, proporcion)` | Caja con relación de aspecto | `aspect_ratio` |
| `flex_layout(hijos, axis, gap, wrap)` | Flex layout configurable | `flex` |

## 📦 Modificadores

| Función | Descripción | Alias |
|---------|-------------|-------|
| `relleno(hijo, cantidad)` | Añade padding alrededor del hijo | `padding` |
| `expansor(hijo)` | Expande para llenar espacio disponible | `expanded` |
| `centrado(hijo)` | Centra al hijo en el contenedor | `centered`, `center` |
| `sombra(hijo, nivel)` | Aplica elevación/sombra (0-5) | `shadow`, `elevated` |
| `adaptable(chico, mediano, grande)` | Layout responsivo 3 variantes | `responsive` |
| `contenedor(hijo, max_width)` | Caja con ancho máximo | `container`, `caja` |

## 🔤 Texto

| Función | Descripción | Alias |
|---------|-------------|-------|
| `etiqueta(texto)` | Etiqueta de texto estático | `label`, `text` |
| `etiqueta_dinamica(variable)` | Etiqueta que se actualiza automáticamente | `varlabel` |
| `etiqueta_titulo(texto)` | Título con estilo headline_medium | `titulo`, `title` |
| `etiqueta_color(texto, color)` | Texto con color personalizado | `texto_color`, `colored_label` |
| `texto_enriquecido(texto)` | Texto enriquecido (Markdown simple) | `prose` |

### Estilos tipográficos (15)

| Función | Estilo MD3 | Alias |
|---------|------------|-------|
| `texto_grande(t)` | display_large (57sp) | `display_large` |
| `texto_mediano(t)` | display_medium (45sp) | `display_medium` |
| `texto_pequeño(t)` | display_small (36sp) | `display_small` |
| `titular_grande(t)` | headline_large (32sp) | `headline_large` |
| `titular_mediano(t)` | headline_medium (28sp) | `headline_medium` |
| `titular_pequeño(t)` | headline_small (24sp) | `headline_small` |
| `encabezado_grande(t)` | title_large (22sp) | `title_large` |
| `encabezado_mediano(t)` | title_medium (16sp) | `title_medium` |
| `encabezado_pequeño(t)` | title_small (14sp) | `title_small` |
| `cuerpo_grande(t)` | body_large (16sp) | `body_large` |
| `cuerpo_mediano(t)` | body_medium (14sp) | `body_medium` |
| `cuerpo_pequeño(t)` | body_small (12sp) | `body_small` |
| `etiqueta_grande(t)` | label_large (14sp) | `label_large` |
| `etiqueta_mediana(t)` | label_medium (12sp) | `label_medium` |
| `etiqueta_pequeña(t)` | label_small (11sp) | `label_small` |

## 🎨 Tema y Colores

| Función | Descripción |
|---------|-------------|
| `tema_material(color_semilla, hijo)` | Proveedor de tema con color semilla |
| `tema_dinámico()` | Detecta modo claro/oscuro del sistema |
| `tema_sistema()` | Alias de tema_dinámico |

### Color roles (envuelven un hijo con el color)

| Función | Alias inglés | Color Role |
|---------|--------------|------------|
| `color_primario(hijo)` | `color_primary` | primary |
| `color_sobre_primario(hijo)` | `color_on_primary` | on_primary |
| `color_primario_contenedor(hijo)` | `color_primary_container` | primary_container |
| `color_sobre_primario_contenedor(hijo)` | `color_on_primary_container` | on_primary_container |
| `color_secundario(hijo)` | `color_secondary` | secondary |
| `color_sobre_secundario(hijo)` | `color_on_secondary` | on_secondary |
| `color_secundario_contenedor(hijo)` | `color_secondary_container` | secondary_container |
| `color_sobre_secundario_contenedor(hijo)` | `color_on_secondary_container` | on_secondary_container |
| `color_terciario(hijo)` | `color_tertiary` | tertiary |
| `color_sobre_terciario(hijo)` | `color_on_tertiary` | on_tertiary |
| `color_error(hijo)` | `color_error_role` | error |
| `color_sobre_error(hijo)` | `color_on_error` | on_error |
| `color_superficie(hijo)` | `color_surface` | surface |
| `color_sobre_superficie(hijo)` | `color_on_surface` | on_surface |
| `color_fondo(hijo)` | `color_background` | background |
| `color_sobre_fondo(hijo)` | `color_on_background` | on_background |
| `color_perfil(hijo)` | `color_outline` | outline |

### Formas

| Función | Radio | Alias |
|---------|-------|-------|
| `esquinas_pequeñas(hijo)` | 8dp | `shape_small` |
| `esquinas_medianas(hijo)` | 12dp | `shape_medium` |
| `esquinas_grandes(hijo)` | 16dp | `shape_large` |
| `esquinas_completas(hijo)` | 50% | `shape_full` |

## 🔘 Botones

| Función | Descripción | Alias |
|---------|-------------|-------|
| `boton(texto, cb)` | Botón genérico (Filled) | `button`, `btn` |
| `boton_relleno(texto, cb)` | Botón relleno (alta énfasis) | `filled_button` |
| `boton_tonal(texto, cb)` | Botón tonal (media énfasis) | `tonal_button` |
| `boton_perfilado(texto, cb)` | Botón perfilado (baja énfasis) | `outlined_button` |
| `boton_texto(texto, cb)` | Botón texto (mínima énfasis) | `text_button_cmd` |
| `boton_elevado(texto, cb)` | Botón elevado (con sombra) | `elevated_button` |

### FAB

| Función | Descripción | Alias |
|---------|-------------|-------|
| `fab(icono, cb)` | FAB mediano (56dp) | — |
| `fab_pequeño(icono, cb)` | FAB pequeño (40dp) | `fab_small` |
| `fab_grande(icono, cb)` | FAB grande (96dp) | `fab_large` |
| `fab_extendido(texto, icono, cb)` | FAB con texto | `fab_extended` |

### Icon Buttons

| Función | Descripción | Alias |
|---------|-------------|-------|
| `boton_icono(icono, cb)` | Icon button estándar | `icon_button` |
| `boton_icono_relleno(icono, cb)` | Icon button relleno | `icon_button_filled` |
| `boton_icono_tonal(icono, cb)` | Icon button tonal | `icon_button_tonal` |
| `boton_icono_perfilado(icono, cb)` | Icon button perfilado | `icon_button_outlined` |

### Segmentados

| Función | Descripción | Alias |
|---------|-------------|-------|
| `segmentado(opciones, seleccion, cb)` | Botón segmentado único | `segmented_button` |
| `segmentado_multiple(opciones, selecciones, cb)` | Botón segmentado múltiple | `segmented_button_multiple` |

### Chips

| Función | Descripción | Alias |
|---------|-------------|-------|
| `subconjunto_asistente(texto, cb)` | Chip asistente | `chip_assist` |
| `subconjunto_filtro(texto, activo, cb)` | Chip filtro | `chip_filter` |
| `subconjunto_entrada(texto, cb_remove)` | Chip entrada (con cerrar) | `chip_input` |
| `subconjunto_sugerencia(texto, cb)` | Chip sugerencia | `chip_suggestion` |

## ⌨️ Inputs

### Text Fields

| Función | Descripción | Alias |
|---------|-------------|-------|
| `campo_texto(variable, etiqueta)` | TextField relleno | — |
| `campo_perfilado(variable, etiqueta)` | TextField perfilado | — |
| `campo_texto_error(variable, etiqueta, error)` | TextField con error | — |
| `campo_contraseña(variable, etiqueta)` | Campo de contraseña | `campo_contrasena` |
| `campo_numero(variable, etiqueta, min, max)` | Campo numérico | — |
| `campo_busqueda(variable)` | Campo de búsqueda | `campo_search` |
| `campo_email(variable, etiqueta)` | Campo email | — |
| `campo_telefono(variable, etiqueta)` | Campo teléfono | — |
| `campo_url(variable, etiqueta)` | Campo URL | — |
| `entrada_texto(variable)` | Input de texto básico | `text_input`, `input` |
| `area_texto(variable)` | Área de texto multilínea | `textarea` |

### Selectores

| Función | Descripción | Alias |
|---------|-------------|-------|
| `contraer_desplegable(opciones, seleccion)` | Dropdown | `dropdown` |
| `menu_seleccion(opciones, seleccion, etiqueta)` | Select con label | `select_menu` |
| `autocompletar(opciones, variable)` | Autocompletar | `autocomplete` |

### Radio, Switch, Sliders

| Función | Descripción | Alias |
|---------|-------------|-------|
| `grupo_radio(opciones, seleccion, cb)` | Grupo de radio buttons | `radio_group` |
| `interruptor(etiqueta, variable)` | Switch/interruptor | `switch_widget` |
| `casilla(etiqueta, variable)` | Checkbox | `checkbox`, `check` |
| `deslizante(variable, min, max)` | Slider continuo | `slider` |
| `deslizante_discreto(variable, min, max, pasos)` | Slider discreto | `discrete_slider` |
| `deslizante_rango(v1, v2, min, max)` | Slider de rango | `range_slider` |
| `grupo_subconjuntos(chips, selecciones, cb)` | Grupo de chips | `chip_group` |

### Pickers

| Función | Descripción | Alias |
|---------|-------------|-------|
| `selector_fecha(variable)` | Date picker | `date_picker` |
| `selector_hora(variable)` | Time picker | `time_picker` |
| `selector_color(variable)` | Color picker | `color_picker` |

## 🃏 Tarjetas, Listas y Tablas

| Función | Descripción | Alias |
|---------|-------------|-------|
| `tarjeta(hijo)` | Card rellena | `card` |
| `tarjeta_elevada(hijo)` | Card elevada | `elevated_card` |
| `tarjeta_perfilada(hijo)` | Card perfilada | `outlined_card` |
| `tarjeta_seleccionable(hijo, variable)` | Card seleccionable | `selectable_card` |
| `elemento_lista(leading, titulo, trailing)` | List item 1 línea | `list_item` |
| `elemento_lista_doble(leading, titulo, subtitulo, trailing)` | List item 2 líneas | `two_line_list_item` |
| `lista(items)` | Lista simple | `list_widget` |
| `lista_con_dividores(items)` | Lista con divisores | `list_with_dividers` |
| `lista_control(items, tipo, variables)` | Lista con controles | `list_control` |
| `lista_seleccion(items, selecciones, cb)` | Lista seleccionable | `list_selection` |
| `tabla_datos(columnas, filas)` | Data table | `data_table` |
| `tabla_ordenable(columnas, filas)` | Tabla ordenable | `sortable_table` |
| `tabla_seleccion(columnas, filas)` | Tabla seleccionable | `selectable_table` |
| `superficie(hijo)` | Superficie | `surface_widget` |
| `superficie_tonal(hijo)` | Superficie tonal | `tonal_surface` |
| `andamio(superior, cuerpo, inferior)` | Scaffold/andamio | `scaffold` |

## 🧭 Navegación

| Función | Descripción | Alias |
|---------|-------------|-------|
| `item_navegacion(icono, etiqueta)` | Item de navegación | `nav_item` |
| `barra_navegacion(items, seleccion, cb)` | NavigationBar | `navigation_bar` |
| `riel_navegacion(items, seleccion, cb)` | NavigationRail | `navigation_rail` |
| `cajon_navegacion(items, seleccion, cb)` | NavigationDrawer | `navigation_drawer` |
| `cajon_modal(items, seleccion, cb, visible)` | Drawer modal | `modal_drawer` |
| `barra_superior(titulo, acciones)` | TopAppBar small | `top_app_bar` |
| `barra_superior_media(titulo)` | TopAppBar medium | `top_app_bar_medium` |
| `barra_superior_grande(titulo)` | TopAppBar large | `top_app_bar_large` |
| `barra_inferior(acciones)` | BottomAppBar | `bottom_app_bar` |
| `pestañas(tabs, seleccion, cb)` | Tabs | `tabs_widget` |
| `pestañas_desplazables(tabs, seleccion, cb)` | Tabs con scroll | `scrollable_tabs` |
| `barra_busqueda(placeholder, variable)` | SearchBar | `search_bar_widget` |

## 💬 Feedback

| Función | Descripción | Alias |
|---------|-------------|-------|
| `dialogo_alerta(titulo, mensaje)` | Diálogo de alerta | `dialog_alert` |
| `dialogo_confirmacion(titulo, mensaje, cb_conf, cb_canc)` | Diálogo de confirmación | `dialog_confirm` |
| `dialogo_personalizado(titulo, hijo)` | Diálogo personalizado | `dialog_custom` |
| `dialogo_completo(titulo, hijo)` | Diálogo pantalla completa | `dialog_full` |
| `hoja_inferior(hijo, visible)` | Bottom sheet estándar | `bottom_sheet` |
| `hoja_inferior_modal(hijo, visible)` | Bottom sheet modal | `modal_sheet` |
| `hoja_inferior_grande(hijo, visible)` | Bottom sheet expandida | `expanded_sheet` |
| `notificación(mensaje)` | Snackbar simple | `snackbar`, `notification` |
| `notificación_accion(mensaje, texto, cb)` | Snackbar con acción | `snackbar_action` |
| `información(contenido, texto)` | Tooltip | `tooltip`, `info` |
| `menú_desplegable(opciones, seleccion, cb)` | Menú desplegable | `menu_desplegable`, `dropdown_menu` |
| `menú_contexto(opciones, seleccion, cb)` | Menú contextual | `menu_contexto`, `context_menu` |

## 📊 Indicadores

| Función | Descripción | Alias |
|---------|-------------|-------|
| `barra_progreso(variable)` | Barra de progreso lineal (0-100) | `progress_bar_linear` |
| `barra_progreso_indeterminada()` | Barra de progreso indeterminada | `progress_bar_indeterminate` |
| `circulo_progreso(variable)` | Círculo de progreso | `circular_progress` |
| `circulo_progreso_indeterminado()` | Spinner circular | `circular_progress_indeterminate` |
| `cargando()` | Spinner de carga | `spinner` |
| `distintivo(hijo, numero)` | Badge con número | `badge` |
| `distintivo_punto(hijo)` | Badge punto | `badge_dot` |
| `esqueleto(ancho, alto)` | Skeleton placeholder | `skeleton` |
| `esqueleto_tarjeta()` | Skeleton tarjeta | `skeleton_card` |
| `esqueleto_linea()` | Skeleton línea | `skeleton_line` |
| `estado_vacio(icono, mensaje)` | Empty state | `empty_state` |
| `estado_error(mensaje)` | Error state | `error_state` |

## 👤 Avatares

| Función | Descripción | Alias |
|---------|-------------|-------|
| `avatar(texto)` | Avatar con iniciales | `avatar_text` |
| `avatar_icono(icono)` | Avatar con icono | `avatar_icon` |
| `avatar_imagen(ruta)` | Avatar con imagen | `avatar_image` |
| `grupo_avatar(avatares)` | Grupo de avatares | `avatar_group` |

## 🏃 Motion

| Función | Descripción | Alias |
|---------|-------------|-------|
| `transición(contenido, visible)` | Fade transition | `fade_transition`, `transition` |
| `efecto_onda(hijo)` | Ripple effect | `ripple_effect`, `ripple` |

## 📈 Gráficos

| Función | Descripción | Alias |
|---------|-------------|-------|
| `gráfico_linea(datos, etiquetas...)` | Gráfico de líneas | `grafico_linea`, `line_chart` |
| `gráfico_barras(datos, etiquetas..., colores...)` | Gráfico de barras | `grafico_barras`, `bar_chart` |
| `gráfico_pastel(datos, etiquetas...)` | Gráfico de pastel | `grafico_pastel`, `pie_chart` |
| `gráfico_donut(datos, etiquetas...)` | Gráfico de donut | `grafico_donut`, `donut_chart` |
| `gráfico_indicador(valor, min, max)` | Gauge/indicador | `grafico_indicador`, `gauge_chart`, `gauge` |
| `minigráfico(datos)` | Sparkline | `minigrafico`, `sparkline` |

## 🎭 Expressive

| Función | Descripción | Alias |
|---------|-------------|-------|
| `tarjeta_vidrio(hijo, blur, opacidad)` | Glassmorphism card | `glass_card`, `glass` |
| `gradiente_lineal(hijo, colores)` | Gradiente lineal | `gradient_box`, `gradient` |
| `gradiente_radial(hijo, colores)` | Gradiente radial | — |
| `boton_morphing(icono, texto, cb)` | Botón animado morphing | `morphing_button` |
| `fondo_expresivo(colores)` | Fondo animado | `expressive_background`, `bg_expressive` |
| `efecto_brillo(hijo, color, ancho)` | Borde con brillo | `glow_border`, `glow` |

## 🔧 Avanzados

| Función | Descripción | Alias |
|---------|-------------|-------|
| `calificación(valor, maximo, cb)` | Calificación estrellas | `calificacion`, `star_rating`, `rating` |
| `asistente_pasos(pasos, actual, cb)` | Asistente de pasos | `stepper` |
| `migaja_de_pan(items)` | Migas de pan | `breadcrumbs` |
| `calendario(mes, año, cb)` | Calendario | `calendar` |
| `visor_markdown(texto)` | Visor Markdown | `markdown_viewer`, `markdown` |
| `visor_qr(texto, tamaño)` | Código QR | `qr_code`, `qr` |
| `selector_archivo(tipos, multiple, cb)` | Selector de archivos | `file_picker` |

## 🎯 Iconos

| Función | Descripción | Alias |
|---------|-------------|-------|
| `icono_material(nombre, tamaño, color)` | Icono Material genérico | `material_icon` |
| `icono_material(nombre, tamaño, color, estilo)` | Icono con estilo | `material_icon` |
| `icono_relleno(nombre, tamaño)` | Icono relleno | `icon_filled` |
| `icono_perfilado(nombre, tamaño)` | Icono contorno | `icon_outlined` |
| `icono_redondo(nombre, tamaño)` | Icono redondeado | `icon_rounded` |
| `icono_agudo(nombre, tamaño)` | Icono agudo | `icon_sharp` |
| `icono_dos_tonos(nombre, tamaño)` | Icono dos tonos | `icon_twotone` |

### Estilos de icono

| Estilo | Descripción |
|--------|-------------|
| `filled` | Relleno (por defecto) |
| `outlined` | Contorno/perfilado |
| `rounded` | Redondeado |
| `sharp` | Agudo/afilado |
| `twotone` | Dos tonos |

## ⚙️ Widgets básicos

| Función | Descripción | Alias |
|---------|-------------|-------|
| `separador()` | Línea separadora | `divider` |
| `espacio(tamaño)` | Espaciador | `spacer` |
| `boton_simple(texto, cb)` | Botón simple | — |

---

*Total: ~180 funciones documentadas*
*Última actualización: Julio 2026*

// Código exportado desde Forja (fa) — https://github.com/lococoi/forja
// Podés ejecutarlo directo con 'forja ejecutar' sin necesidad de compilar Rust

#![cfg_attr(target_os = "windows", windows_subsystem = "windows")]

// ─── GUI: Forja GUI Runtime (xilem precompilado) ───
use forja_gui_rt::view::{self, Axis};
use forja_gui_rt::{AnyWidgetView, WidgetView, Xilem, WindowOptions, EventLoop, EventLoopError, Length};

// fn main() de Forja omitido (GUI usa Xilem)
fn cuerpo_responsive(p: i64, btn_disabled: String, btn_icon: String, texto_val: String, slider_val: String, switch_val: String, rating_val: String, menu_abierto: String) -> i64 {
    return adaptable(columna(espacio(8), texto_grande(titulo_categoria(p)), espacio(4), separador(), espacio(8), desplazable(seccion_activa(p, btn_disabled, btn_icon, texto_val, slider_val, switch_val, rating_val)), cajon_modal(vec![item_navegacion(String::from("🔘"), String::from("Botones")), item_navegacion(String::from("⌨️"), String::from("Inputs")), item_navegacion(String::from("🃏"), String::from("Tarjetas")), item_navegacion(String::from("💬"), String::from("Feedback")), item_navegacion(String::from("🧭"), String::from("Navegación")), item_navegacion(String::from("📊"), String::from("Indicadores")), item_navegacion(String::from("👤"), String::from("Avatares")), item_navegacion(String::from("📈"), String::from("Gráficos")), item_navegacion(String::from("🎭"), String::from("Expressive")), item_navegacion(String::from("🏃"), String::from("Motion")), item_navegacion(String::from("📐"), String::from("Layout"))], p, &cambiar_pagina_cb, menu_abierto)), fila(vec![riel_navegacion(vec![item_navegacion(String::from("🔘"), String::from("")), item_navegacion(String::from("⌨️"), String::from("")), item_navegacion(String::from("🃏"), String::from("")), item_navegacion(String::from("💬"), String::from("")), item_navegacion(String::from("🧭"), String::from("")), item_navegacion(String::from("📊"), String::from("")), item_navegacion(String::from("👤"), String::from("")), item_navegacion(String::from("📈"), String::from("")), item_navegacion(String::from("🎭"), String::from("")), item_navegacion(String::from("🏃"), String::from("")), item_navegacion(String::from("📐"), String::from(""))], p, &cambiar_pagina_cb, false), desplazable(columna(texto_grande(titulo_categoria(p)), espacio(4), separador(), espacio(8), seccion_activa(p, btn_disabled, btn_icon, texto_val, slider_val, switch_val, rating_val)))]), fila(vec![riel_navegacion(vec![item_navegacion(String::from("🔘"), String::from("Botones")), item_navegacion(String::from("⌨️"), String::from("Inputs")), item_navegacion(String::from("🃏"), String::from("Tarjetas")), item_navegacion(String::from("💬"), String::from("Feedback")), item_navegacion(String::from("🧭"), String::from("Navegación")), item_navegacion(String::from("📊"), String::from("Indicadores")), item_navegacion(String::from("👤"), String::from("Avatares")), item_navegacion(String::from("📈"), String::from("Gráficos")), item_navegacion(String::from("🎭"), String::from("Expressive")), item_navegacion(String::from("🏃"), String::from("Motion")), item_navegacion(String::from("📐"), String::from("Layout"))], p, &cambiar_pagina_cb, true), desplazable(columna(texto_grande(titulo_categoria(p)), espacio(8), separador(), espacio(12), seccion_activa(p, btn_disabled, btn_icon, texto_val, slider_val, switch_val, rating_val)))]));
}

fn titulo_categoria(p: i64) -> String {
    if p == 0 {
        return String::from("🔘 Botones");
    } else {
        if p == 1 {
            return String::from("⌨️ Inputs");
        } else {
            if p == 2 {
                return String::from("🃏 Tarjetas");
            } else {
                if p == 3 {
                    return String::from("💬 Feedback");
                } else {
                    if p == 4 {
                        return String::from("🧭 Navegación");
                    } else {
                        if p == 5 {
                            return String::from("📊 Indicadores");
                        } else {
                            if p == 6 {
                                return String::from("👤 Avatares");
                            } else {
                                if p == 7 {
                                    return String::from("📈 Gráficos");
                                } else {
                                    if p == 8 {
                                        return String::from("🎭 Expressive");
                                    } else {
                                        if p == 9 {
                                            return String::from("🏃 Motion");
                                        } else {
                                            return String::from("📐 Layout");
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

fn seccion_activa(p: i64, btn_disabled: String, btn_icon: String, texto_val: String, slider_val: String, switch_val: String, rating_val: String) -> i64 {
    if p == 0 {
        return seccion_botones(btn_disabled, btn_icon);
    } else {
        if p == 1 {
            return seccion_inputs(texto_val, slider_val, switch_val);
        } else {
            if p == 2 {
                return seccion_tarjetas();
            } else {
                if p == 3 {
                    return seccion_feedback();
                } else {
                    if p == 4 {
                        return seccion_navegacion();
                    } else {
                        if p == 5 {
                            return seccion_indicadores(slider_val);
                        } else {
                            if p == 6 {
                                return seccion_avatares();
                            } else {
                                if p == 7 {
                                    return seccion_graficos(rating_val);
                                } else {
                                    if p == 8 {
                                        return seccion_expressive();
                                    } else {
                                        if p == 9 {
                                            return seccion_motion();
                                        } else {
                                            return seccion_layout();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

fn seccion_botones(disabled: String, con_icono: String) -> i64 {
    return columna(texto_mediano(String::from("Variantes principales")), espacio(8), fila_con_gap(vec![boton_relleno(String::from("Relleno"), &accion_story), boton_tonal(String::from("Tonal"), &accion_story), boton_perfilado(String::from("Perfilado"), &accion_story), boton_texto(String::from("Texto"), &accion_story), boton_elevado(String::from("Elevado"), &accion_story)], 8, String::from("centro")), espacio(16), texto_mediano(String::from("FAB")), espacio(8), fila_con_gap(vec![fab_pequeño(String::from("➕"), &accion_story), fab(String::from("➕"), &accion_story), fab_grande(String::from("➕"), &accion_story)], 8, String::from("centro")), espacio(16), texto_mediano(String::from("Icon Buttons")), espacio(8), fila_con_gap(vec![boton_icono(String::from("⭐"), &accion_story), boton_icono_relleno(String::from("⭐"), &accion_story), boton_icono_tonal(String::from("⭐"), &accion_story)], 8, String::from("centro")), espacio(16), texto_mediano(String::from("Chips")), espacio(8), flujo(vec![subconjunto_asistente(String::from("Ayuda"), &accion_story), subconjunto_filtro(String::from("Filtro"), true, &accion_story), subconjunto_sugerencia(String::from("Sugerencia"), &accion_story)], 8));
}

fn seccion_inputs(texto: String, slider: String, sw: String) -> i64 {
    return columna(texto_mediano(String::from("Campos de texto")), espacio(8), campo_texto(texto, String::from("Texto")), espacio(8), campo_email(texto, String::from("Email")), espacio(8), campo_contraseña(texto, String::from("Contraseña")), espacio(8), campo_numero(texto, String::from("Edad"), 0, 150), espacio(16), texto_mediano(String::from("Controles")), espacio(8), interruptor(String::from("Interruptor"), sw), espacio(8), deslizante(slider, 0, 100), espacio(16), texto_mediano(String::from("Fecha y Color")), espacio(8), fila_con_gap(vec![selector_fecha(String::from("2025-01-15")), selector_color(String::from("#6750A4"))], 16, String::from("centro")));
}

fn seccion_tarjetas() -> i64 {
    return columna(texto_mediano(String::from("Variantes de tarjeta")), espacio(8), fila_con_gap(vec![tarjeta(etiqueta(String::from("Filled"))), tarjeta_elevada(etiqueta(String::from("Elevated"))), tarjeta_perfilada(etiqueta(String::from("Outlined")))], 16, String::from("inicio")), espacio(16), texto_mediano(String::from("Listas")), espacio(8), lista_con_dividores(vec![elemento_lista_doble(icono_material(String::from("folder"), 24, String::from("secondary")), String::from("Docs"), String::from("15 archivos"), icono_material(String::from("arrow_forward"), 24, String::from("on_surface_variant"))), elemento_lista_doble(icono_material(String::from("image"), 24, String::from("secondary")), String::from("Fotos"), String::from("42 archivos"), icono_material(String::from("arrow_forward"), 24, String::from("on_surface_variant"))), elemento_lista_doble(icono_material(String::from("audiotrack"), 24, String::from("secondary")), String::from("Música"), String::from("8 archivos"), icono_material(String::from("arrow_forward"), 24, String::from("on_surface_variant")))]));
}

fn seccion_feedback() -> i64 {
    return columna(texto_mediano(String::from("Diálogos")), espacio(8), fila_con_gap(vec![boton_relleno(String::from("Alerta"), &mostrar_alerta_cb), boton_tonal(String::from("Confirmar"), &mostrar_confirmacion_cb)], 8, String::from("centro")), espacio(16), texto_mediano(String::from("Bottom Sheets")), espacio(8), boton_tonal(String::from("Hoja inferior"), &mostrar_hoja_cb), espacio(16), texto_mediano(String::from("Snackbar")), espacio(8), boton_relleno(String::from("Notificar"), &mostrar_notificacion_cb));
}

fn seccion_navegacion() -> i64 {
    return columna(texto_mediano(String::from("Top App Bar")), espacio(8), barra_superior(String::from("Título"), vec![boton_icono(String::from("🔔"), &accion_story), boton_icono(String::from("⚙️"), &accion_story)]), espacio(16), texto_mediano(String::from("Pestañas")), espacio(8), pestañas(vec![String::from("Inicio"), String::from("Explorar")], 0, &cambiar_tab_cb), espacio(16), texto_mediano(String::from("Barra inferior")), espacio(8), barra_navegacion(vec![item_navegacion(String::from("🏠"), String::from("Inicio")), item_navegacion(String::from("🔍"), String::from("Buscar")), item_navegacion(String::from("👤"), String::from("Perfil"))], 0, &accion_story));
}

fn seccion_indicadores(progreso: String) -> i64 {
    return columna(texto_mediano(String::from("Barras de progreso")), espacio(8), barra_progreso(progreso), espacio(8), barra_progreso_indeterminada(), espacio(16), texto_mediano(String::from("Progreso circular")), espacio(8), fila_con_gap(vec![circulo_progreso(progreso), circulo_progreso_indeterminado()], 16, String::from("centro")), espacio(16), texto_mediano(String::from("Badges")), espacio(8), fila_con_gap(vec![distintivo(boton_icono(String::from("🔔"), &accion_story), String::from("3")), distintivo_punto(boton_icono(String::from("💬"), &accion_story))], 16, String::from("centro")));
}

fn seccion_avatares() -> i64 {
    return columna(texto_mediano(String::from("Avatares")), espacio(8), fila_con_gap(vec![avatar(String::from("AB")), avatar_icono(String::from("👤")), avatar_icono(String::from("🎨"))], 16, String::from("centro")), espacio(16), texto_mediano(String::from("Grupo de avatares")), espacio(8), grupo_avatar(vec![String::from("AB"), String::from("CD"), String::from("EF")]));
}

fn seccion_graficos(puntuacion: String) -> i64 {
    return columna(texto_mediano(String::from("Gráfico de barras")), espacio(8), gráfico_barras(vec![30, 55, 80, 45, 70], vec![String::from("Ene"), String::from("Feb"), String::from("Mar"), String::from("Abr"), String::from("May")]), espacio(16), texto_mediano(String::from("Gráfico de pastel")), espacio(8), gráfico_pastel(vec![30, 25, 20, 15, 10], vec![String::from("A"), String::from("B"), String::from("C"), String::from("D"), String::from("E")]), espacio(16), texto_mediano(String::from("Sparkline")), espacio(8), minigráfico(vec![10, 25, 18, 42, 35, 60, 48]), espacio(16), texto_mediano(String::from("Calificación")), espacio(8), calificación(3, 5, &accion_story));
}

fn seccion_expressive() -> i64 {
    return columna(texto_mediano(String::from("Glassmorphism")), espacio(8), tarjeta_vidrio(etiqueta(String::from("Efecto vidrio")), 20, 0.7), espacio(16), texto_mediano(String::from("Gradiente")), espacio(8), gradiente_lineal(tarjeta(etiqueta(String::from("Gradiente"))), vec![String::from("#6750A4"), String::from("#D0BCFF")]), espacio(16), texto_mediano(String::from("Glow")), espacio(8), efecto_brillo(boton_relleno(String::from("Brillo"), &accion_story), String::from("#6750A4"), 2));
}

fn seccion_motion() -> i64 {
    let visible = true;
    return columna(texto_mediano(String::from("Transiciones")), espacio(8), interruptor(String::from("Mostrar"), visible), espacio(8), transición(tarjeta_elevada(etiqueta(String::from("Fade transition"))), visible));
}

fn seccion_layout() -> i64 {
    return columna(texto_mediano(String::from("Flow layout")), espacio(8), flujo(vec![subconjunto_asistente(String::from("Tag 1"), &accion_story), subconjunto_asistente(String::from("Tag 2"), &accion_story), subconjunto_asistente(String::from("Tag 3"), &accion_story)], 8), espacio(16), texto_mediano(String::from("Flex Layout")), espacio(8), flex_layout(vec![boton_relleno(String::from("A"), &accion_story), boton_tonal(String::from("B"), &accion_story), boton_perfilado(String::from("C"), &accion_story)], String::from("horizontal"), 12, false), espacio(16), texto_mediano(String::from("Espaciadores")), espacio(8), fila(vec![boton_relleno(String::from("Izquierda"), &accion_story), expansor(), boton_relleno(String::from("Derecha"), &accion_story)]));
}

fn accion_story(valor: String) -> String {
    return valor;
}

fn toggle_tema_cb(valor: String) -> String {
    return String::from("Tema alternado");
}

fn toggle_menu_cb(valor: String) -> String {
    return String::from("Menú toggle");
}

fn cambiar_pagina_cb(valor: String) -> String {
    return valor;
}

fn cambiar_tab_cb(valor: String) -> String {
    return valor;
}

fn mostrar_alerta_cb(valor: String) -> String {
    dialogo_alerta(String::from("Título"), String::from("Mensaje de alerta"));
    return valor;
}

fn mostrar_confirmacion_cb(valor: String) -> String {
    dialogo_confirmacion(String::from("¿Confirmar?"), String::from("¿Estás seguro?"), &accion_story, &accion_story);
    return valor;
}

fn mostrar_hoja_cb(valor: String) -> String {
    hoja_inferior(columna(vec![texto_mediano(String::from("Bottom Sheet")), etiqueta(String::from("Contenido")), boton_relleno(String::from("Cerrar"), &accion_story)]), String::from("verdadero"));
    return valor;
}

fn mostrar_notificacion_cb(valor: String) -> String {
    notificación(String::from("Archivo guardado"));
    return valor;
}

#[derive(Default)]
struct AppState {
    pagina: String,
    tema_oscuro: String,
    menu_abierto: String,
    btn_disabled: String,
    btn_icon: String,
    switch_val: String,
    slider_val: String,
    texto_val: String,
    rating_val: String,
    visible: String,
}

fn app_logic(data: &mut AppState) -> impl WidgetView<AppState> {
    let children: Vec<Box<AnyWidgetView<AppState>>> = vec![
        Box::new(view::label(String::from("Forja + Xilem GUI"))) as Box<AnyWidgetView<AppState>>,
    ];
    view::flex(Axis::Vertical, (children,))
}

fn main() -> Result<(), EventLoopError> {
    // Modo oscuro: Xilem usa tema dark por defecto en Windows
    Xilem::new_simple(
        AppState::default(),
        app_logic,
        WindowOptions::new("Forja GUI".to_string()),
    ).run_in(EventLoop::with_user_event())
}

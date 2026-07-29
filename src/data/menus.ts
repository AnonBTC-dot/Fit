/**
 * MENÚS DE LAS 8 SEMANAS
 *
 * Reparto de proteína a medida: carne de res y cerdo como base, pollo puntual
 * y pescado ocasional. Sin repetir plato dentro de la misma semana y con
 * guarnición de verdura en todos los principales (micronutrientes).
 */

import type { DayMenu } from "./meals";

export const MENU_WEEKS: DayMenu[][] = [
  /* Semana 1 */
  [
    { breakfast: "d_tortillaavena", lunch: "c_pollolimon", dinner: "n_milanesa", snack: "s_batidorojo" },
    { breakfast: "d_huevosrancheros", lunch: "c_ensaladaternera", dinner: "n_ensaladacaprese", snack: "s_palomitas" },
    { breakfast: "d_revueltoternera", lunch: "c_chuletacerdo", dinner: "n_cremacalabaza", snack: "s_mugcake" },
    { breakfast: "d_tostavo", lunch: "c_cerdoagridulce", dinner: "n_atunplancha", snack: "s_yogurnueces" },
    { breakfast: "d_tortillajamon", lunch: "c_bistecencebollado", dinner: "n_pimientosrellenos", snack: "s_huevosduros" },
    { breakfast: "d_bowlyogur", lunch: "c_curry", dinner: "n_wokterneraverde", snack: "s_manzanacacahuete" },
    { breakfast: "d_tortitas", lunch: "c_entrecot", dinner: "n_burger", snack: "s_platanonueces" }
  ],
  /* Semana 2 */
  [
    { breakfast: "d_tortillaavena", lunch: "c_cerdoagridulce", dinner: "n_wokterneraverde", snack: "s_huevosduros" },
    { breakfast: "d_huevosrancheros", lunch: "c_ensaladaternera", dinner: "n_terneraplancha", snack: "s_mugcake" },
    { breakfast: "d_tortillajamon", lunch: "c_bistecencebollado", dinner: "n_ropavieja", snack: "s_platanonueces" },
    { breakfast: "d_tostavo", lunch: "c_entrecot", dinner: "n_burgerternera", snack: "s_yogurnueces" },
    { breakfast: "d_revueltoternera", lunch: "c_estofado", dinner: "n_milanesa", snack: "s_batidorojo" },
    { breakfast: "d_overnight", lunch: "c_chuletacerdo", dinner: "n_raviolis", snack: "s_manzanacacahuete" },
    { breakfast: "d_tortitas", lunch: "c_tacos", dinner: "n_cerdochampinones", snack: "s_palomitas" }
  ],
  /* Semana 3 */
  [
    { breakfast: "d_tostavo", lunch: "c_ensaladaternera", dinner: "n_cerdochampinones", snack: "s_mugcake" },
    { breakfast: "d_tortitas", lunch: "c_carneasada", dinner: "n_milanesa", snack: "s_huevosduros" },
    { breakfast: "d_tortillaavena", lunch: "c_entrecot", dinner: "n_cremacalabaza", snack: "s_yogurnueces" },
    { breakfast: "d_tortillajamon", lunch: "c_ensaladatemplada", dinner: "n_wokterneraverde", snack: "s_palomitas" },
    { breakfast: "d_overnight", lunch: "c_chuletacerdo", dinner: "n_cesar", snack: "s_platanonueces" },
    { breakfast: "d_bowlyogur", lunch: "c_tacos", dinner: "n_burgerternera", snack: "s_manzanacacahuete" },
    { breakfast: "d_revueltoternera", lunch: "c_cerdoagridulce", dinner: "n_terneraplancha", snack: "s_quesoaceitunas" }
  ],
  /* Semana 4 */
  [
    { breakfast: "d_bowlyogur", lunch: "c_estofado", dinner: "n_ropavieja", snack: "s_huevosduros" },
    { breakfast: "d_tostavo", lunch: "c_bistecencebollado", dinner: "n_burgerternera", snack: "s_mugcake" },
    { breakfast: "d_revueltoternera", lunch: "c_chili", dinner: "n_terneraplancha", snack: "s_yogurnueces" },
    { breakfast: "d_tortitas", lunch: "c_ensaladaternera", dinner: "n_ensaladacaprese", snack: "s_platanonueces" },
    { breakfast: "d_overnight", lunch: "c_tacos", dinner: "n_milanesa", snack: "s_batidorojo" },
    { breakfast: "d_huevosrancheros", lunch: "c_cerdoagridulce", dinner: "n_pizzafit", snack: "s_manzanacacahuete" },
    { breakfast: "d_tortillajamon", lunch: "c_chuletacerdo", dinner: "n_tortillapatata", snack: "s_palomitas" }
  ],
  /* Semana 5 */
  [
    { breakfast: "d_revueltoternera", lunch: "c_bistecencebollado", dinner: "n_burgerternera", snack: "s_quesoaceitunas" },
    { breakfast: "d_tortillajamon", lunch: "c_pollolimon", dinner: "n_wokterneraverde", snack: "s_mugcake" },
    { breakfast: "d_gachas", lunch: "c_churrasco", dinner: "n_huevosrotos", snack: "s_huevosduros" },
    { breakfast: "d_bowlyogur", lunch: "c_pulledpork", dinner: "n_pinchomoruno", snack: "s_manzanacacahuete" },
    { breakfast: "d_tostavo", lunch: "c_ensaladaternera", dinner: "n_tortillaverde", snack: "s_yogurnueces" },
    { breakfast: "d_tortillaavena", lunch: "c_costillas", dinner: "n_cerdochampinones", snack: "s_batidorojo" },
    { breakfast: "d_huevosrancheros", lunch: "c_ensaladatemplada", dinner: "n_raviolis", snack: "s_palomitas" }
  ],
  /* Semana 6 */
  [
    { breakfast: "d_tortillaavena", lunch: "c_bowlquinoa", dinner: "n_ensaladacaprese", snack: "s_manzanacacahuete" },
    { breakfast: "d_huevosrancheros", lunch: "c_ensaladatemplada", dinner: "n_terneraplancha", snack: "s_huevosduros" },
    { breakfast: "d_tortillajamon", lunch: "c_costillas", dinner: "n_cerdochampinones", snack: "s_batidorojo" },
    { breakfast: "d_tostavo", lunch: "c_fajitas", dinner: "n_burger", snack: "s_quesoaceitunas" },
    { breakfast: "d_revueltoternera", lunch: "c_bistecencebollado", dinner: "n_gambas", snack: "s_yogurnueces" },
    { breakfast: "d_tortitas", lunch: "c_ensaladapollo", dinner: "n_huevosrotos", snack: "s_platanonueces" },
    { breakfast: "d_gachas", lunch: "c_lomocerdo", dinner: "n_pinchomoruno", snack: "s_palomitas" }
  ],
  /* Semana 7 */
  [
    { breakfast: "d_revueltoternera", lunch: "c_costillas", dinner: "n_cerdochampinones", snack: "s_huevosduros" },
    { breakfast: "d_tortitas", lunch: "c_ensaladapollo", dinner: "n_milanesa", snack: "s_platanonueces" },
    { breakfast: "d_tortillaavena", lunch: "c_chuletacerdo", dinner: "n_pinchomoruno", snack: "s_yogurnueces" },
    { breakfast: "d_huevosrancheros", lunch: "c_carneasada", dinner: "n_polloajillo", snack: "s_manzanacacahuete" },
    { breakfast: "d_gachas", lunch: "c_brochetas", dinner: "n_ropavieja", snack: "s_quesoaceitunas" },
    { breakfast: "d_tortillajamon", lunch: "c_estofado", dinner: "n_wokterneraverde", snack: "s_mugcake" },
    { breakfast: "d_tostavo", lunch: "c_churrasco", dinner: "n_tortillaverde", snack: "s_palomitas" }
  ],
  /* Semana 8 */
  [
    { breakfast: "d_gachas", lunch: "c_ensaladaternera", dinner: "n_wokterneraverde", snack: "s_mugcake" },
    { breakfast: "d_revueltoternera", lunch: "c_tacos", dinner: "n_pinchomoruno", snack: "s_quesoaceitunas" },
    { breakfast: "d_tortitas", lunch: "c_curry", dinner: "n_burgerternera", snack: "s_huevosduros" },
    { breakfast: "d_tostavo", lunch: "c_pastapollo", dinner: "n_milanesa", snack: "s_palomitas" },
    { breakfast: "d_huevosrancheros", lunch: "c_churrasco", dinner: "n_shakshuka", snack: "s_batidorojo" },
    { breakfast: "d_tortillaavena", lunch: "c_estofado", dinner: "n_cerdochampinones", snack: "s_platanonueces" },
    { breakfast: "d_tortillajamon", lunch: "c_carneasada", dinner: "n_polloajillo", snack: "s_yogurnueces" }
  ]
];

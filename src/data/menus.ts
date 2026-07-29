/**
 * MENÚS DE LAS 8 SEMANAS
 *
 * Reglas: res y cerdo como base · pollo máx 1 vez/semana · salmón máx 1 vez/semana
 * (sin otros pescados) · huevo a diario · sin repetir plato dentro de la semana
 * · guarnición vegetal en todos los principales.
 *
 * Las comidas libres del finde y el snack que cuadra los macros los decide
 * buildDayPlan() en tiempo real, no están fijados aquí.
 */

import type { DayMenu } from "./meals";

export const MENU_WEEKS: DayMenu[][] = [
  /* Semana 1 */
  [
    { breakfast: "d_tortitas", lunch: "c_wokternera", dinner: "n_wokterneraverde", snack: "s_mugcake" },
    { breakfast: "d_tostavo", lunch: "c_ensaladaternera", dinner: "n_burgerdoble", snack: "s_tartaqueso" },
    { breakfast: "d_revueltoternera", lunch: "c_carneasada", dinner: "n_pinchomoruno", snack: "s_huevosduros" },
    { breakfast: "d_tortillaavena", lunch: "c_ensaladatemplada", dinner: "n_burgerternera", snack: "s_yogurchoco" },
    { breakfast: "d_tortillajamon", lunch: "c_berenjenasrellenas", dinner: "n_ropavieja", snack: "s_palomitas" },
    { breakfast: "d_huevosrancheros", lunch: "c_cerdoagridulce", dinner: "n_cerdochampinones", snack: "s_mugcakewhey" },
    { breakfast: "d_overnight", lunch: "c_entrecot", dinner: "n_pimientosrellenos", snack: "s_skyrbowl" }
  ],
  /* Semana 2 */
  [
    { breakfast: "d_tortillaavena", lunch: "c_entrecot", dinner: "n_pimientosrellenos", snack: "s_mugcake" },
    { breakfast: "d_tortillajamon", lunch: "c_pastacremosa", dinner: "n_pinchomoruno", snack: "s_huevosduros" },
    { breakfast: "d_revueltoternera", lunch: "c_pulledpork", dinner: "n_burgerdoble", snack: "s_tartaqueso" },
    { breakfast: "d_tortitas", lunch: "c_polloasado", dinner: "n_cerdochampinones", snack: "s_skyrbowl" },
    { breakfast: "d_tostavo", lunch: "c_lomocerdo", dinner: "n_milanesa", snack: "s_yogurnueces" },
    { breakfast: "d_gachas", lunch: "c_cerdoagridulce", dinner: "n_burgerternera", snack: "s_mugcakewhey" },
    { breakfast: "d_huevosrancheros", lunch: "c_tacos", dinner: "n_salmonteriyaki", snack: "s_batidorojo" }
  ],
  /* Semana 3 */
  [
    { breakfast: "d_tortillaavena", lunch: "c_chili", dinner: "n_cerdochampinones", snack: "s_palomitas" },
    { breakfast: "d_tortitas", lunch: "c_churrasco", dinner: "n_shakshuka", snack: "s_mugcakewhey" },
    { breakfast: "d_tortillajamon", lunch: "c_wokternera", dinner: "n_tortillaverde", snack: "s_yogurnueces" },
    { breakfast: "d_revueltoternera", lunch: "c_chuletacerdo", dinner: "n_burgerternera", snack: "s_platanonueces" },
    { breakfast: "d_tostavo", lunch: "c_ensaladaternera", dinner: "n_wrap", snack: "s_tartaqueso" },
    { breakfast: "d_huevosrancheros", lunch: "c_cerdomielmostaza", dinner: "n_milanesa", snack: "s_batidoproteico" },
    { breakfast: "d_gachas", lunch: "c_tacos", dinner: "n_salmonteriyaki", snack: "s_quesoaceitunas" }
  ],
  /* Semana 4 */
  [
    { breakfast: "d_tortillaavena", lunch: "c_cerdomielmostaza", dinner: "n_pinchomoruno", snack: "s_tartaqueso" },
    { breakfast: "d_tortitas", lunch: "c_entrecot", dinner: "n_polloajillo", snack: "s_mugcake" },
    { breakfast: "d_huevosrancheros", lunch: "c_tacosmaiz", dinner: "n_terneraplancha", snack: "s_yogurnueces" },
    { breakfast: "d_tostavo", lunch: "c_carneasada", dinner: "n_milanesa", snack: "s_huevosduros" },
    { breakfast: "d_revueltoternera", lunch: "c_wokternera", dinner: "n_salmonteriyaki", snack: "s_mugcakewhey" },
    { breakfast: "d_overnight", lunch: "c_chili", dinner: "n_tortillaverde", snack: "s_batidorojo" },
    { breakfast: "d_tortillajamon", lunch: "c_lomocerdo", dinner: "n_burger", snack: "s_mousseproteico" }
  ],
  /* Semana 5 */
  [
    { breakfast: "d_tortitas", lunch: "c_cerdomielmostaza", dinner: "n_cesar", snack: "s_mousseproteico" },
    { breakfast: "d_revueltoternera", lunch: "c_ensaladaternera", dinner: "n_salmonteriyaki", snack: "s_huevosduros" },
    { breakfast: "d_tostavo", lunch: "c_costillas", dinner: "n_tortillaverde", snack: "s_skyrbowl" },
    { breakfast: "d_tortillaavena", lunch: "c_berenjenasrellenas", dinner: "n_ropavieja", snack: "s_mugcakewhey" },
    { breakfast: "d_gachas", lunch: "c_estofado", dinner: "n_shakshuka", snack: "s_mugcake" },
    { breakfast: "d_huevosrancheros", lunch: "c_lasagna", dinner: "n_burgerternera", snack: "s_yogurnueces" },
    { breakfast: "d_tortillajamon", lunch: "c_chuletacerdo", dinner: "n_burgerdoble", snack: "s_tartaqueso" }
  ],
  /* Semana 6 */
  [
    { breakfast: "d_tortillajamon", lunch: "c_chuletacerdo", dinner: "n_ropavieja", snack: "s_tartaqueso" },
    { breakfast: "d_tortillaavena", lunch: "c_wokternera", dinner: "n_burgerternera", snack: "s_mugcakewhey" },
    { breakfast: "d_revueltoternera", lunch: "c_tacosmaiz", dinner: "n_terneraplancha", snack: "s_huevosduros" },
    { breakfast: "d_huevosrancheros", lunch: "c_pulledpork", dinner: "n_milanesa", snack: "s_batidorojo" },
    { breakfast: "d_tortitas", lunch: "c_cerdoagridulce", dinner: "n_huevosrotos", snack: "s_yogurchoco" },
    { breakfast: "d_overnight", lunch: "c_bolonesa", dinner: "n_pollocrujiente", snack: "s_batidoproteico" },
    { breakfast: "d_tostavo", lunch: "c_salmon", dinner: "n_burgerdoble", snack: "s_mugcake" }
  ],
  /* Semana 7 */
  [
    { breakfast: "d_tortillajamon", lunch: "c_cerdoagridulce", dinner: "n_wrap", snack: "s_mugcake" },
    { breakfast: "d_huevosrancheros", lunch: "c_pulledpork", dinner: "n_ropavieja", snack: "s_heladoplatano" },
    { breakfast: "d_tostavo", lunch: "c_salmon", dinner: "n_burgerdoble", snack: "s_yogurnueces" },
    { breakfast: "d_revueltoternera", lunch: "c_entrecot", dinner: "n_cerdochampinones", snack: "s_tartaqueso" },
    { breakfast: "d_tortillaavena", lunch: "c_chuletacerdo", dinner: "n_pinchomoruno", snack: "s_huevosduros" },
    { breakfast: "d_tortitas", lunch: "c_lomocerdo", dinner: "n_milanesa", snack: "s_mugcakewhey" },
    { breakfast: "d_bowlyogur", lunch: "c_churrasco", dinner: "n_raviolis", snack: "s_manzanacacahuete" }
  ],
  /* Semana 8 */
  [
    { breakfast: "d_huevosrancheros", lunch: "c_costillas", dinner: "n_milanesa", snack: "s_mugcakewhey" },
    { breakfast: "d_tostavo", lunch: "c_lomocerdo", dinner: "n_cerdochampinones", snack: "s_huevosduros" },
    { breakfast: "d_gachas", lunch: "c_berenjenasrellenas", dinner: "n_ropavieja", snack: "s_mugcake" },
    { breakfast: "d_revueltoternera", lunch: "c_polloasado", dinner: "n_pinchomoruno", snack: "s_quesoaceitunas" },
    { breakfast: "d_tortitas", lunch: "c_pulledpork", dinner: "n_salmonteriyaki", snack: "s_manzanacacahuete" },
    { breakfast: "d_tortillaavena", lunch: "c_cerdoagridulce", dinner: "n_burgerdoble", snack: "s_tartaqueso" },
    { breakfast: "d_tortillajamon", lunch: "c_tacosmaiz", dinner: "n_wokterneraverde", snack: "s_yogurnueces" }
  ]
];

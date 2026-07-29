/**
 * MENÚS SUGERIDOS DE LAS 8 SEMANAS
 *
 * IMPORTANTE: esto es una SUGERENCIA, no una obligación. Cada comida se puede
 * cambiar desde la app por cualquier alternativa del recetario ("Cambiar plato"),
 * y los macros se recalculan solos.
 *
 * Criterio de la sugerencia: res y cerdo de base · huevo todos los días ·
 * camarones ~1 cada 2 semanas · salmón y pollo máx 1 por semana · sin repetir
 * plato en la semana · guarnición vegetal en todos los principales.
 */

import type { DayMenu } from "./meals";

export const MENU_WEEKS: DayMenu[][] = [
  /* Semana 1 */
  [
    { breakfast: "d_revueltoternera", lunch: "c_cerdomielmostaza", dinner: "n_tortillaverde", snack: "s_mugcake" },
    { breakfast: "d_tortillajamon", lunch: "c_lomocerdo", dinner: "n_shakshuka", snack: "s_tartaqueso" },
    { breakfast: "d_tortitas", lunch: "c_bistecencebollado", dinner: "n_huevoscerdo", snack: "s_mugcakewhey" },
    { breakfast: "d_tortillaavena", lunch: "c_estofado", dinner: "n_milanesa", snack: "s_tortillamini" },
    { breakfast: "d_tostavo", lunch: "c_chuletacerdo", dinner: "n_cremacalabaza", snack: "s_huevoaguacate" },
    { breakfast: "d_gachas", lunch: "c_pastacremosa", dinner: "n_huevosrotos", snack: "s_huevosduros" },
    { breakfast: "d_huevosrancheros", lunch: "c_pulledpork", dinner: "n_revueltogambas", snack: "s_batidorojo" }
  ],
  /* Semana 2 */
  [
    { breakfast: "d_tortillaavena", lunch: "c_lomocerdo", dinner: "n_cremacalabaza", snack: "s_mugcake" },
    { breakfast: "d_revueltoternera", lunch: "c_cerdoagridulce", dinner: "n_huevoscerdo", snack: "s_manzanacacahuete" },
    { breakfast: "d_tortillajamon", lunch: "c_resconhuevo", dinner: "n_ropavieja", snack: "s_tartaqueso" },
    { breakfast: "d_tortitas", lunch: "c_churrasco", dinner: "n_tortillaverde", snack: "s_heladoplatano" },
    { breakfast: "d_tostavo", lunch: "c_carneasada", dinner: "n_shakshuka", snack: "s_mousseproteico" },
    { breakfast: "d_bowlyogur", lunch: "c_ensaladaternera", dinner: "n_huevosalhorno", snack: "s_tortillamini" },
    { breakfast: "d_overnight", lunch: "c_chili", dinner: "n_milanesa", snack: "s_huevoaguacate" }
  ],
  /* Semana 3 */
  [
    { breakfast: "d_gachas", lunch: "c_pastacremosa", dinner: "n_tortillaverde", snack: "s_huevoaguacate" },
    { breakfast: "d_revueltoternera", lunch: "c_camaronesboniato", dinner: "n_huevoscerdo", snack: "s_mugcake" },
    { breakfast: "d_tortillaavena", lunch: "c_cerdomielmostaza", dinner: "n_milanesa", snack: "s_tartaqueso" },
    { breakfast: "d_tortitas", lunch: "c_cerdoagridulce", dinner: "n_shakshuka", snack: "s_huevosduros" },
    { breakfast: "d_tostavo", lunch: "c_arrozhuevores", dinner: "n_cerdochampinones", snack: "s_tortillamini" },
    { breakfast: "d_tortillajamon", lunch: "c_estofado", dinner: "n_cremacalabaza", snack: "s_batidoproteico" },
    { breakfast: "d_huevosrancheros", lunch: "c_tacosmaiz", dinner: "n_huevosalhorno", snack: "s_mugcakewhey" }
  ],
  /* Semana 4 */
  [
    { breakfast: "d_revueltoternera", lunch: "c_lomocerdo", dinner: "n_shakshuka", snack: "s_huevosduros" },
    { breakfast: "d_tortitas", lunch: "c_costillas", dinner: "n_huevosalhorno", snack: "s_huevoaguacate" },
    { breakfast: "d_tostavo", lunch: "c_tacos", dinner: "n_milanesa", snack: "s_tortillamini" },
    { breakfast: "d_tortillajamon", lunch: "c_pulledpork", dinner: "n_huevoscerdo", snack: "s_mugcake" },
    { breakfast: "d_gachas", lunch: "c_cerdomielmostaza", dinner: "n_tortillaverde", snack: "s_tartaqueso" },
    { breakfast: "d_overnight", lunch: "c_ensaladaternera", dinner: "n_cremacalabaza", snack: "s_yogurnueces" },
    { breakfast: "d_bowlyogur", lunch: "c_resconhuevo", dinner: "n_ropavieja", snack: "s_palomitas" }
  ],
  /* Semana 5 */
  [
    { breakfast: "d_tortillaavena", lunch: "c_churrasco", dinner: "n_milanesa", snack: "s_mugcake" },
    { breakfast: "d_tortillajamon", lunch: "c_chuletacerdo", dinner: "n_shakshuka", snack: "s_tortillamini" },
    { breakfast: "d_tortitas", lunch: "c_resconhuevo", dinner: "n_ropavieja", snack: "s_huevoaguacate" },
    { breakfast: "d_bowlyogur", lunch: "c_pulledpork", dinner: "n_huevosalhorno", snack: "s_mugcakewhey" },
    { breakfast: "d_revueltoternera", lunch: "c_cerdoagridulce", dinner: "n_tortillacamarones", snack: "s_heladoplatano" },
    { breakfast: "d_tostavo", lunch: "c_estofado", dinner: "n_huevoscerdo", snack: "s_quesoaceitunas" },
    { breakfast: "d_gachas", lunch: "c_tacos", dinner: "n_tortillaverde", snack: "s_huevosduros" }
  ],
  /* Semana 6 */
  [
    { breakfast: "d_tortillaavena", lunch: "c_ensaladaternera", dinner: "n_cremacalabaza", snack: "s_tortillamini" },
    { breakfast: "d_tortitas", lunch: "c_arrozhuevores", dinner: "n_milanesa", snack: "s_huevoaguacate" },
    { breakfast: "d_revueltoternera", lunch: "c_cerdomielmostaza", dinner: "n_huevoscerdo", snack: "s_mugcakewhey" },
    { breakfast: "d_tortillajamon", lunch: "c_wokternera", dinner: "n_huevosalhorno", snack: "s_tartaqueso" },
    { breakfast: "d_tostavo", lunch: "c_churrasco", dinner: "n_shakshuka", snack: "s_batidoproteico" },
    { breakfast: "d_overnight", lunch: "c_entrecot", dinner: "n_tortillaverde", snack: "s_huevosduros" },
    { breakfast: "d_bowlyogur", lunch: "c_pulledpork", dinner: "n_huevosrotos", snack: "s_mugcake" }
  ],
  /* Semana 7 */
  [
    { breakfast: "d_tortitas", lunch: "c_arrozhuevores", dinner: "n_wokterneraverde", snack: "s_tortillamini" },
    { breakfast: "d_tortillaavena", lunch: "c_pollolimon", dinner: "n_tortillaverde", snack: "s_yogurchoco" },
    { breakfast: "d_tostavo", lunch: "c_lasagna", dinner: "n_huevoscerdo", snack: "s_mugcakewhey" },
    { breakfast: "d_revueltoternera", lunch: "c_cerdomielmostaza", dinner: "n_huevosalhorno", snack: "s_huevosduros" },
    { breakfast: "d_tortillajamon", lunch: "c_bolonesa", dinner: "n_milanesa", snack: "s_mugcake" },
    { breakfast: "d_overnight", lunch: "c_churrasco", dinner: "n_tortillacamarones", snack: "s_batidorojo" },
    { breakfast: "d_huevosrancheros", lunch: "c_cerdoagridulce", dinner: "n_shakshuka", snack: "s_platanonueces" }
  ],
  /* Semana 8 */
  [
    { breakfast: "d_tortillajamon", lunch: "c_ensaladagarb", dinner: "n_huevoscerdo", snack: "s_manzanacacahuete" },
    { breakfast: "d_revueltoternera", lunch: "c_chili", dinner: "n_milanesa", snack: "s_huevosduros" },
    { breakfast: "d_tortitas", lunch: "c_chuletacerdo", dinner: "n_tortillaverde", snack: "s_skyrbowl" },
    { breakfast: "d_tostavo", lunch: "c_ensaladaternera", dinner: "n_pollocrujiente", snack: "s_mugcake" },
    { breakfast: "d_tortillaavena", lunch: "c_churrasco", dinner: "n_huevosalhorno", snack: "s_mugcakewhey" },
    { breakfast: "d_huevosrancheros", lunch: "c_tacos", dinner: "n_shakshuka", snack: "s_platanonueces" },
    { breakfast: "d_bowlyogur", lunch: "c_tacosmaiz", dinner: "n_huevosrotos", snack: "s_huevoaguacate" }
  ]
];

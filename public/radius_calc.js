/**
 * Utiliser cette formule pour calculer un rayon de 3km autour d'un point donné :
 * - Δlat = ±(3 km / 111.12 km/°) (pour la latitude) -> ±0.027°
 * - Δlon = ±(3 km / (111.12 km/° * cos(lat))) (pour la longitude) -> ±0.036°
 *   - 111.12 km est la distance approximative en kilomètres correspondant à un degré de latitude.
 *   - 'lat' est la latitude en degrés décimaux.
 *
 * Application :
 *  where: {
 *      latitude: {
 *      [Op.between]: [latitude-0.027, latitude+0.027]
 *      },
 *      longitude: {
 *      [Op.between]: [longitude-0.027, longitude+0.027]
 *      },
 *  }
 *
 * * Par la suite, on pourrait laisser le choix du rayon/de la distance à l'utilsateur
 * * -> il faudra :
 * *    - ajouter un champs "radius" sur la table user
 * *    - le remplacer dans la formule ci-dessous
 */

module.exports = (latitude, longitude) => {
  const radiusInKm = 3;

  // Calcul du delta de latitude en degrés décimaux
  const deltaLatitude = radiusInKm / 111.12;
  const latitudeMin = (latitude - deltaLatitude).toString();
  const latitudeMax = (latitude + deltaLatitude).toString();

  // Calcul du delta de longitude en degrés décimaux
  const deltaLongitude =
    radiusInKm / (111.12 * Math.cos(latitude * (Math.PI / 180)));
  const longitudeMin = (longitude - deltaLongitude).toString();
  const longitudeMax = (longitude + deltaLongitude).toString();

  return {
    latitude: { min: latitudeMin, max: latitudeMax },
    longitude: { min: longitudeMin, max: longitudeMax },
  };
};

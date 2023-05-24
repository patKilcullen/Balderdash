import express from "express"
// import RestaurantsCtrl from "./restaurants.controller.js"
import RoundsCtrl from "./rounds.controller.js"
import RestaurantsCtrl from "./restaurants.controller.js"

const router = express.Router()


// router.route("/").get((req,res) => res.send("helrrrrrrrrlocccc"))

 router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
// router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
// router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

// router
//   .route("/review")
//   .post(RoundsCtrl.apiPostRound)
//   .put(RoundsCtrl.apiUpdateRound)
//   .delete(RoundsCtrl.apiDeleteRound)

export default router
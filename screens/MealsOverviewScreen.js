import { useLayoutEffect } from 'react';
import {useSelector } from 'react-redux';

import MealsList from '../components/MealsList/MealsList';
import { MEALS, CATEGORIES } from '../data/dummy-data';

import {ACPAnalytics} from '@adobe/react-native-acpanalytics';
import {ACPCore} from '@adobe/react-native-acpcore';
import { store } from './store/redux/store';


function MealsOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
const hashedEmail = useSelector((state) => state.auth.hashedEmail);



  useLayoutEffect(() => {


    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    var contextData = {"screen": categoryTitle,
                    "language":"English",
                    "category":"Category landing page"};
if(isAuthenticated){
  contextData['userid'] = hashedEmail;
  contextData['loginStatus'] = true
} else{
  contextData['loginStatus'] = false
}

console.log("Inside Meals Overview Screen"+ JSON.stringify(contextData));


// send the tracking call - use either a trackAction or trackState call.
// trackAction example:
ACPCore.trackAction("PageView", contextData);
// trackState example:
ACPCore.trackState("PageLoad", contextData);

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />;
}

export default MealsOverviewScreen;

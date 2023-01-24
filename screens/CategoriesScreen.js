import { FlatList } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { getProducts } from '../store/redux/product';
import {LoadingOverlay} from '../components/ui/LoadingOverlay';

import { CATEGORIES } from '../data/dummy-data';
import {ACPAnalytics} from '@adobe/react-native-acpanalytics';
import {ACPCore} from '@adobe/react-native-acpcore';
import { store } from './store/redux/store';


function CategoriesScreen({ navigation }) {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const hashedEmail = useSelector((state) => state.auth.hashedEmail);
  

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate('MealsOverview', {
        categoryId: itemData.item.id,
      });
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

 ACPAnalytics.extensionVersion().then(version => console.log("AdobeExperienceSDK: ACPAnalytics version: " + version));


    // create a context data dictionary and add events
  var contextData = {"screen": "Homepage",
                      "language":"English",
                      "category":"Home Landing Page"};
  if(isAuthenticated){
    contextData['userid'] = hashedEmail;
    contextData['loginStatus'] = true
  } else{
    contextData['loginStatus'] = false
  }
  
  console.log("Inside Categories Screen"+ JSON.stringify(contextData));
  
  // send the tracking call - use either a trackAction or trackState call.
  // trackAction example:
  ACPCore.trackAction("PageView", contextData);
  // trackState example:
  ACPCore.trackState("PageLoad", contextData);

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;

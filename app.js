var firebaseConfig = {
    apiKey: "AIzaSyDTcSOY9uAlkWwZPLkdvaEgUPZcsJ1cNwY",
    authDomain: "restaurant-menu-a59ea.firebaseapp.com",
    databaseURL: "https://restaurant-menu-a59ea.firebaseio.com",
    projectId: "restaurant-menu-a59ea",
    storageBucket: "restaurant-menu-a59ea.appspot.com",
    messagingSenderId: "907944859697",
    appId: "1:907944859697:web:c7615254b2ee873942dd10"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const dbRef = firebase.database().ref();
const menuItemsRef = dbRef.child('menuItems');

const menuItemsListUI = document.getElementById('menu-item-list');

function updateSelectedElement(item) {
    document.getElementById("menu-item-name").innerHTML = item.name;
    document.getElementById("menu-item-price").innerHTML = "$" + item.price;
    document.getElementById("menu-item-ingredients").innerHTML = item.ingredients;
}

function menuItemClicked(e) {
    let itemID = e.target.getAttribute("child-key");
    const itemRef = dbRef.child('menuItems/' + itemID);
    const item = {};

    itemRef.on("child_added", snap => {
        item[snap.key] = snap.val();
    });

    updateSelectedElement(item);
}

menuItemsRef.on("child_added", snap => {
    let menuItem = snap.val();
    let listItem = document.createElement("li");
    listItem.innerHTML = menuItem.name;
    listItem.setAttribute("child-key", snap.key);
    listItem.addEventListener("click", menuItemClicked); 
    menuItemsListUI.append(listItem);
    
    //set default selected item
    if (snap.key == 0) { updateSelectedElement(menuItem)}
});
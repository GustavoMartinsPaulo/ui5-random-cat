sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/StandardListItem",
	"sap/m/ListType" 
], function (Controller, StandardListItem, ListType) {
	"use strict";

	return Controller.extend("ovly.random-cat.controller.View1", {
		
		endPoint: "https://aws.random.cat/meow",
		
		onInit: function () {
			
		},
		
		onAddPress: function () {
			this.callAPI();
		},
		
		onItemPress: function (oEvent) {
			var oItemPressed = oEvent.getSource();
			var oCat = {
				index: oItemPressed.getProperty("title"),
				image: oItemPressed.getProperty("icon")
			};
			
			this._updateImage(oCat);
		},
		
		onDeletePress: function () {
			var oCat = {
				index: "",
				image: ""
			};
			this._updateImage(oCat);
			this.byId("list").removeAllItems();
		},
		
		callAPI: function () {
			var callback = $.proxy(this._updateContainers, this);
			
			$.get(this.endPoint, callback);
		},
		
		_updateContainers: function (result) {
			var iListItems = this.byId("list").getItems();
			var iNewIndex = iListItems.length + 1;
			
			var oCat = {
				index: iNewIndex,
				image: result.file
			};
			
			this._updateList(oCat);
			this._updateImage(oCat);
		},
		
		_updateList: function (oCat) {
			var oItem = new StandardListItem({
				icon: oCat.image,
				title: oCat.index,
				type: ListType.Navigation,
				press: [this.onItemPress, this]
			});
			
			this.byId("list").addItem(oItem);
		},
		
		_updateImage: function(oCat) {
			this.byId("detail-page").setTitle(oCat.index);
			this.byId("image-container").setSrc(oCat.image);
		}
	});
});
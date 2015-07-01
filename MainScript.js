var DBName='DEL_80';
var _This_Sub_Cat_ID=0;
var _This_Image_ID=0;
var _this_SC_ID=0;
var _to_Eled_SC_ID=0;
var _LoaderSC_ID=0;
var _LoaderCC_ID=0;
var _SubCatDeletableImage='';
var _ImageData='';
var _NetSc_ID='';
var _MainUrl="http://ambujaapps.com/";
var _Loaded_CI_ID=0;
var _Loaded_SC_Src='';
var _this_DeletableSrc='';
var _NetCc_ID=0;

var _Loaded_CCI_ID=0;
var _Loaded_CC_Src='';
	$(document).ready(function(e) {
		LoadCreateCats();
    });
	
	
	
	$(document).ajaxStart(function() {
			$.mobile.loading( 'show', {
			text: 'Loading..',
			textVisible: false,
			theme: 'a',
			html: ""
			});
		});
		
		$(document).ajaxStop(function() {
			$.mobile.loading('hide');
		});
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
	function onDeviceReady() 
	{
		pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }
    
	
	function capturePhoto() 
	{
      	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI  });
    }
	
	function onPhotoDataSuccess(imageURI) 
	{
		var App_Html='<li><a href="#"><img style="width:60px;height:60px" class="MySepImage" src="'+ imageURI +'"></a><a href="#" class="ui-icon-delete"></a> </li>';
		$('#MyImages').append(App_Html);
		$('#MyImages').listview();
    }
	
	function onFail(message) 
	{
      alert('Failed because: ' + message);
    }
	
	function LoadCreateCats()
	{
		Log_('Loading Cats'); 
		var db = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);	
	}
	function populateDB(tx) 
	{
		tx.executeSql('CREATE TABLE IF NOT EXISTS PlanMaster (PM_ID,Title,Order_)');   /* Check Table Exist */
		tx.executeSql('CREATE TABLE IF NOT EXISTS SuCats (SC_ID,PM_ID,Title)');   /* Check Table Exist */
		tx.executeSql('CREATE TABLE IF NOT EXISTS SuCatImages (CI_ID,SC_ID,Src)');   /* Check Table Exist */
		tx.executeSql('CREATE TABLE IF NOT EXISTS ChieldCats (CC_ID,SC_ID,Title)');   /* Check Table Exist */
		tx.executeSql('CREATE TABLE IF NOT EXISTS ChieldCatImages (CCI_ID,CC_ID,Src)');   /* Check Table Exist */
		tx.executeSql('CREATE TABLE IF NOT EXISTS MyInfo (Name_,Mobile_,Email_)');   /* Check Table Exist */
		tx.executeSql('CREATE TABLE IF NOT EXISTS MyWorks (Image_,Address_,Area_,Cost_,Duretion_,Name_,W_ID INTEGER PRIMARY KEY  AUTOINCREMENT)');   /* Check Table Exist */
		tx.executeSql('CREATE TABLE IF NOT EXISTS WorkImages (W_ID,Src)');   /* Check Table Exist */
		tx.executeSql('select * from PlanMaster order by Order_ ',[],CheckData,errorCB);
	}
	function CheckData(tx, results)
	{
		Log_('In Function CheckData');
		
		var len = results.rows.length;
		Log_('In Function CheckData Len='+ len);
		var _PostHTML='';
		
		if ( len == 0) /* if Cats not inserted */
		{
			var db1 = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
       		db1.transaction(InsertData, errorCB, successCB);	 /* Insert items */	
			Log_('Insert items');
			return;
		}
		
		for (var i=0; i< len; i++)
		{
_PostHTML +='<li ><a class="ui-btn" OnClick="ShowSelectedcat('+ results.rows.item(i).PM_ID +',\''+  results.rows.item(i).Title +'\')" href="#">'+ results.rows.item(i).Title +'</a></li>';
		}
		$('#MainCats').html(_PostHTML);
		$('#MainCats').listview();
	}
	
	function InsertData(tx)
	{
		 /* Inserting Values */
		Log_('Inserting Values');
		tx.executeSql('insert into PlanMaster (PM_ID,Title,Order_) values (1,"Plan",1)'); 
		tx.executeSql('insert into PlanMaster (PM_ID,Title,Order_) values (2,"3D View",2)'); 
		tx.executeSql('insert into PlanMaster (PM_ID,Title,Order_) values (3,"Gate Design",7)'); 
		tx.executeSql('insert into PlanMaster (PM_ID,Title,Order_) values (4,"Staircases",5)');
		tx.executeSql('insert into PlanMaster (PM_ID,Title,Order_) values (5,"Door / Windows",6)');
		tx.executeSql('insert into PlanMaster (PM_ID,Title,Order_) values (6,"Kitchen",4)');
		tx.executeSql('insert into PlanMaster (PM_ID,Title,Order_) values (7,"Drawing Room",3)');
		tx.executeSql('insert into PlanMaster (PM_ID,Title,Order_) values (8,"Vastu",8)');
		tx.executeSql('insert into PlanMaster (PM_ID,Title,Order_) values (9,"Special features",9)')
		
		/*----------Plan--------------*/
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (1,1,"500-750")'); 
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (2,1,"750-1000")'); 
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (3,1,"1000-1500")'); 
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (4,1,"1500+")'); 
		
		/*----------3D--------------*/
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (5,2,"500-750")'); 
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (6,2,"750-1000")'); 
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (7,2,"1000-1500")'); 
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (8,2,"1500+")'); 

		
		/*----------Gate Design--------------*/
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (9,3,"Single leaf")'); 
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (10,3,"Double leaf")'); 
		
		/*----------Staircases--------------*/
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (11,4,"Doglegged")'); 
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (12,4,"Spiral")'); 
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (13,4,"Rounded")'); 
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (14,4,"Zigzag")'); 
		
		/*----------Door / Windows--------------*/
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (15,5,"Door")');
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (16,5,"Windows")');
		
		/*----------Kitchen Arrangements--------------*/
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (17,6,"Modular kitchen")');
		
		/*----------Drawing Room--------------*/
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (18,7,"Drawing Room")');
		
		/*----------Vasstu--------------*/
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (19,8,"Vastu")');

		/*----------Special Features--------------*/
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (20,9,"A")');
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (21,9,"B")');
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (22,9,"C")');
		tx.executeSql('insert into SuCats (SC_ID,PM_ID,Title) values (23,9,"D")');

		
		tx.executeSql('insert into ChieldCats (CC_ID,SC_ID,Title) values (1,1,"G")');  /*--- plan G fro 500-750 ---*/
		tx.executeSql('insert into ChieldCats (CC_ID,SC_ID,Title) values (2,1,"G+1")');  /*--- plan G +1 for 500-750  ---*/
		tx.executeSql('insert into ChieldCats (CC_ID,SC_ID,Title) values (3,1,"G+2")'); /*--- plan G + 2 for 500-750---*/
		
		


		tx.executeSql('insert into ChieldCats (CC_ID,SC_ID,Title) values (4,2,"G")'); 
		tx.executeSql('insert into ChieldCats (CC_ID,SC_ID,Title) values (5,2,"G+1")'); 
		tx.executeSql('insert into ChieldCats (CC_ID,SC_ID,Title) values (6,2,"G+2")'); 
		
		tx.executeSql('insert into ChieldCats (CC_ID,SC_ID,Title) values (7,3,"G")'); 
		tx.executeSql('insert into ChieldCats (CC_ID,SC_ID,Title) values (8,3,"G+1")'); 
		tx.executeSql('insert into ChieldCats (CC_ID,SC_ID,Title) values (9,3,"G+2")'); 
		
		tx.executeSql('insert into ChieldCats (CC_ID,SC_ID,Title) values (10,4,"G")'); 
		tx.executeSql('insert into ChieldCats (CC_ID,SC_ID,Title) values (11,4,"G+1")'); 
		tx.executeSql('insert into ChieldCats (CC_ID,SC_ID,Title) values (12,4,"G+2")'); 
		
		
		/*-----------------------------------------------------------------------------------------------------*/
		/*---------------------------------------IMAGES INSERT-------------------------------------------------*/
		/*-----------------------------------------------------------------------------------------------------*/
				
		/*----------Plan--------------*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (1,"imgs/plan/500-750/20130116_044031_1BHK510.jpg")'); /*--- plan 500-750 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (1,"imgs/plan/500-750/floor-plan-2-comfort-zone-big.jpg")'); /*--- plan 500-750 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (1,"imgs/plan/500-750/2bhk_floor_plan.jpg")'); /*--- plan 500-750 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (1,"imgs/plan/500-750/1_bhk_700_sq_ft.jpg")'); /*--- plan 500-750 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (1,"imgs/plan/500-750/floor_plan_5bhk.jpg")'); /*--- plan 500-750 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (1,"imgs/plan/500-750/floor4.jpg")'); /*--- plan 500-750 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (1,"imgs/plan/500-750/grand-circuit-625sq-ft.jpg")'); /*--- plan 500-750 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (1,"imgs/plan/500-750/605_Sq_Ft.jpg")'); /*--- plan 500-750 ---*/
		

		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (2,"imgs/plan/750-1000/01.jpg")'); /*--- plan 750-1000 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (2,"imgs/plan/750-1000/02.jpg")'); /*--- plan 750-1000 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (2,"imgs/plan/750-1000/03.jpg")'); /*--- plan 750-1000 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (2,"imgs/plan/750-1000/04.jpg")'); /*--- plan 750-1000 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (2,"imgs/plan/750-1000/05.jpg")'); /*--- plan 750-1000 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (2,"imgs/plan/750-1000/06.jpg")'); /*--- plan 750-1000 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (2,"imgs/plan/750-1000/07.jpg")'); /*--- plan 750-1000 ---*/
		
		
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (3,"imgs/plan/100-1500/01.jpg")'); /*--- plan 1000-1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (3,"imgs/plan/100-1500/02.png")'); /*--- plan 1000-1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (3,"imgs/plan/100-1500/03.jpg")'); /*--- plan 1000-1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (3,"imgs/plan/100-1500/04.jpg")'); /*--- plan 1000-1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (3,"imgs/plan/100-1500/05.jpg")'); /*--- plan 1000-1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (3,"imgs/plan/100-1500/06.jpg")'); /*--- plan 1000-1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (3,"imgs/plan/100-1500/07.jpg")'); /*--- plan 1000-1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (3,"imgs/plan/100-1500/08.jpg")'); /*--- plan 1000-1500 ---*/
		
		
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (4,"imgs/plan/1500/01.jpg")'); /*--- plan 1500+ ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (4,"imgs/plan/1500/02.jpg")'); /*--- plan 1500+ ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (4,"imgs/plan/1500/03.jpg")'); /*--- plan 1500+ ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (4,"imgs/plan/1500/04.jpg")'); /*--- plan 1500+ ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (4,"imgs/plan/1500/05.jpg")'); /*--- plan 1500+ ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (4,"imgs/plan/1500/06.jpg")'); /*--- plan 1500+ ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (4,"imgs/plan/1500/07.jpg")'); /*--- plan 1500+ ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (4,"imgs/plan/1500/08.jpg")'); /*--- plan 1500+ ---*/
		
		
		
		/*----------3D--------------*/
		
		
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (5,"imgs/3D/500-750/01.jpg")'); /*--- 3D 500-750 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (5,"imgs/3D/500-750/02.jpg")'); /*--- 3D 500-750 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (5,"imgs/3D/500-750/03.jpg")'); /*--- 3D 500-750 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (5,"imgs/3D/500-750/04.jpg")'); /*--- 3D 500-750 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (5,"imgs/3D/500-750/05.jpg")'); /*--- 3D 500-750 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (5,"imgs/3D/500-750/06.jpg")'); /*--- 3D 500-750 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (5,"imgs/3D/500-750/07.jpg")'); /*--- 3D 500-750 ---*/
		
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (6,"imgs/3D/750-1000/01.jpg")'); /*--- 3D 750 - 1000 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (6,"imgs/3D/750-1000/02.jpg")'); /*--- 3D 750 - 1000 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (6,"imgs/3D/750-1000/03.jpg")'); /*--- 3D 750 - 1000 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (6,"imgs/3D/750-1000/04.jpg")'); /*--- 3D 750 - 1000 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (6,"imgs/3D/750-1000/05.jpg")'); /*--- 3D 750 - 1000 ---*/
		
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (7,"imgs/3D/1000-1500/01.jpg")'); /*--- 3D 1000 - 1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (7,"imgs/3D/1000-1500/02.jpg")'); /*--- 3D 1000 - 1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (7,"imgs/3D/1000-1500/03.jpg")'); /*--- 3D 1000 - 1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (7,"imgs/3D/1000-1500/04.jpg")'); /*--- 3D 1000 - 1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (7,"imgs/3D/1000-1500/05.jpg")'); /*--- 3D 1000 - 1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (7,"imgs/3D/1000-1500/06.jpg")'); /*--- 3D 1000 - 1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (7,"imgs/3D/1000-1500/07.jpg")'); /*--- 3D 1000 - 1500 ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (7,"imgs/3D/1000-1500/08.jpg")'); /*--- 3D 1000 - 1500 ---*/
		
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (8,"imgs/3D/1500/01.jpg")'); /*--- 3D  1500 +  ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (8,"imgs/3D/1500/02.jpg")'); /*--- 3D  1500 +  ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (8,"imgs/3D/1500/03.jpg")'); /*--- 3D  1500 +  ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (8,"imgs/3D/1500/04.jpg")'); /*--- 3D  1500 +  ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (8,"imgs/3D/1500/05.jpg")'); /*--- 3D  1500 +  ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (8,"imgs/3D/1500/06.jpg")'); /*--- 3D  1500 +  ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (8,"imgs/3D/1500/07.jpg")'); /*--- 3D  1500 +  ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (8,"imgs/3D/1500/08.jpg")'); /*--- 3D  1500 +  ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (8,"imgs/3D/1500/09.jpg")'); /*--- 3D  1500 +  ---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (8,"imgs/3D/1500/10.jpg")'); /*--- 3D  1500 +  ---*/
		
			
				
		/*----------Door / Windows--------------*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (15,"imgs/Doors/66b80fce1269a657763d6ffbad530d62.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (15,"imgs/Doors/house-door-wood-clear-fancy-glass.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (15,"imgs/Doors/images.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (15,"imgs/Doors/images01.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (15,"imgs/Doors/images02.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (15,"imgs/Doors/index.jpeg")');
		
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (16,"imgs/Windows/01.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (16,"imgs/Windows/02.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (16,"imgs/Windows/03.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (16,"imgs/Windows/04.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (16,"imgs/Windows/05.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (16,"imgs/Windows/06.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (16,"imgs/Windows/07.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (16,"imgs/Windows/08.JPG")');
		
		/*----------Living / Drawing Room--------------*/
		
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (18,"imgs/LivingRoom/01.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (18,"imgs/LivingRoom/02.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (18,"imgs/LivingRoom/03.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (18,"imgs/LivingRoom/04.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (18,"imgs/LivingRoom/05.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (18,"imgs/LivingRoom/06.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (18,"imgs/LivingRoom/07.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (18,"imgs/LivingRoom/08.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (18,"imgs/LivingRoom/09.jpg")');
		
		
		/*----------Vastu--------------*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (19,"imgs/Vastu/03.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (19,"imgs/Vastu/04.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (19,"imgs/Vastu/01.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (19,"imgs/Vastu/02.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (19,"imgs/Vastu/05.jpg")');
		
		
		
		
		/*----------Gate--------------*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (9,"imgs/Gate/Singleleaf/images.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (9,"imgs/Gate/Singleleaf/images01.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (9,"imgs/Gate/Singleleaf/images02.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (9,"imgs/Gate/Singleleaf/index.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (9,"imgs/Gate/Singleleaf/Venus_SS_12ft gate.gif")');
		
		
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (10,"imgs/Gate/DoubleLeaf/images.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (10,"imgs/Gate/DoubleLeaf/Cranborne.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (10,"imgs/Gate/DoubleLeaf/images.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (10,"imgs/Gate/DoubleLeaf/images.png")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (10,"imgs/Gate/DoubleLeaf/images01.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (10,"imgs/Gate/DoubleLeaf/matlock-entrance-50.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (10,"imgs/Gate/DoubleLeaf/Two-leaf-swing-gates.jpg")');
		
		/*----------kitchen--------------*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (17,"imgs/kitchen/gallery2.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (17,"imgs/kitchen/images.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (17,"imgs/kitchen/images01.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (17,"imgs/kitchen/images02.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (17,"imgs/kitchen/images03.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (17,"imgs/kitchen/index.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (17,"imgs/kitchen/modular-kitchen-design.jpg")');
		
		
		/*----------Staircases--------------*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (11,"imgs/Staircase/Doglegged/half-turn-staircase-wooden-steps-open-lateral-stringer-62007-1994353.jpg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (11,"imgs/Staircase/Doglegged/images.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (11,"imgs/Staircase/Doglegged/index.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (11,"imgs/Staircase/Doglegged/index01.jpeg")');
		
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (12,"imgs/Staircase/Sprial/images03.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (12,"imgs/Staircase/Sprial/index.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (12,"imgs/Staircase/Sprial/index01.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (12,"imgs/Staircase/Sprial/index02.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (12,"imgs/Staircase/Sprial/unique-spiral-staircase.jpg")');
		
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (13,"imgs/Staircase/Rounded/images.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (13,"imgs/Staircase/Rounded/index.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (13,"imgs/Staircase/Rounded/index01.jpeg")');
		
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (14,"imgs/Staircase/zigzag/images.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (14,"imgs/Staircase/zigzag/images01.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (14,"imgs/Staircase/zigzag/images02.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (14,"imgs/Staircase/zigzag/images03.jpeg")');
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (14,"imgs/Staircase/zigzag/images04.jpeg")');
			
		
		/*----------Plan G 500-750--------------*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (1,"imgs/elevation/gee/01.jpg")');  /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (1,"imgs/elevation/gee/02.jpg")');  /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (1,"imgs/elevation/gee/03.jpg")'); /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (1,"imgs/elevation/gee/04.jpg")'); /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (1,"imgs/elevation/gee/05.jpg")'); /*---  PLAN 500-750 G ---*/	
		
		
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (2,"imgs/elevation/G1/01.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (2,"imgs/elevation/G1/02.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (2,"imgs/elevation/G1/04.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (2,"imgs/elevation/G1/05.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (2,"imgs/elevation/G1/06.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (2,"imgs/elevation/G1/07.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		
			
		
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (3,"imgs/elevation/G2/01.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (3,"imgs/elevation/G2/02.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (3,"imgs/elevation/G2/03.jpg")');  /*---  PLAN 500-750 G + 2---*/

		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (3,"imgs/elevation/G2/05.jpg")');  /*---  PLAN 500-750 G + 2---*/

		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (3,"imgs/elevation/G2/07.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (3,"imgs/elevation/G2/08.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (3,"imgs/elevation/G2/09.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (3,"imgs/elevation/G2/10.jpg")');  /*---  PLAN 500-750 G + 2---*/	
		
		
		
		
		/*----------Plan G 750-1000--------------*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (4,"imgs/elevation/gee/01.jpg")');  /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (4,"imgs/elevation/gee/02.jpg")');  /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (4,"imgs/elevation/gee/03.jpg")'); /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (4,"imgs/elevation/gee/04.jpg")'); /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (4,"imgs/elevation/gee/05.jpg")'); /*---  PLAN 500-750 G ---*/	

		
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (5,"imgs/elevation/G1/01.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (5,"imgs/elevation/G1/02.jpg")');  /*---  PLAN 500-750 G + 1---*/	
	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (5,"imgs/elevation/G1/04.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (5,"imgs/elevation/G1/05.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (5,"imgs/elevation/G1/06.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (5,"imgs/elevation/G1/07.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (5,"imgs/elevation/G1/08.jpg")');  /*---  PLAN 500-750 G + 1---*/	
			
		
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (6,"imgs/elevation/G2/01.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (6,"imgs/elevation/G2/02.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (6,"imgs/elevation/G2/03.jpg")');  /*---  PLAN 500-750 G + 2---*/

		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (6,"imgs/elevation/G2/05.jpg")');  /*---  PLAN 500-750 G + 2---*/

		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (6,"imgs/elevation/G2/07.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (6,"imgs/elevation/G2/08.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (6,"imgs/elevation/G2/09.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (6,"imgs/elevation/G2/10.jpg")');  /*---  PLAN 500-750 G + 2---*/	
		
		
			/*----------Plan G 1000 - 1500 --------------*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (7,"imgs/elevation/gee/01.jpg")');  /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (7,"imgs/elevation/gee/02.jpg")');  /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (7,"imgs/elevation/gee/03.jpg")'); /*---  PLAN 500-750 G ---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (7,"imgs/elevation/gee/04.jpg")'); /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (7,"imgs/elevation/gee/05.jpg")'); /*---  PLAN 500-750 G ---*/	
		
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (8,"imgs/elevation/G1/01.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (8,"imgs/elevation/G1/02.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (8,"imgs/elevation/G1/04.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (8,"imgs/elevation/G1/05.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (8,"imgs/elevation/G1/06.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (8,"imgs/elevation/G1/07.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (8,"imgs/elevation/G1/08.jpg")');  /*---  PLAN 500-750 G + 1---*/	
			
		
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (9,"imgs/elevation/G2/01.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (9,"imgs/elevation/G2/02.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (9,"imgs/elevation/G2/03.jpg")');  /*---  PLAN 500-750 G + 2---*/

		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (9,"imgs/elevation/G2/05.jpg")');  /*---  PLAN 500-750 G + 2---*/

		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (9,"imgs/elevation/G2/07.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (9,"imgs/elevation/G2/08.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (9,"imgs/elevation/G2/09.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (9,"imgs/elevation/G2/10.jpg")');  /*---  PLAN 500-750 G + 2---*/	
		
		/*----------Plan G  1500 + --------------*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (10,"imgs/elevation/gee/01.jpg")');  /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (10,"imgs/elevation/gee/02.jpg")');  /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (10,"imgs/elevation/gee/03.jpg")'); /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (10,"imgs/elevation/gee/04.jpg")'); /*---  PLAN 500-750 G ---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (10,"imgs/elevation/gee/05.jpg")'); /*---  PLAN 500-750 G ---*/	
		
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (11,"imgs/elevation/G1/01.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (11,"imgs/elevation/G1/02.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (11,"imgs/elevation/G1/04.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (11,"imgs/elevation/G1/05.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (11,"imgs/elevation/G1/06.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (11,"imgs/elevation/G1/07.jpg")');  /*---  PLAN 500-750 G + 1---*/	
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (11,"imgs/elevation/G1/08.jpg")');  /*---  PLAN 500-750 G + 1---*/	
			
		
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (12,"imgs/elevation/G2/01.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (12,"imgs/elevation/G2/02.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (12,"imgs/elevation/G2/03.jpg")');  /*---  PLAN 500-750 G + 2---*/

		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (12,"imgs/elevation/G2/05.jpg")');  /*---  PLAN 500-750 G + 2---*/

		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (12,"imgs/elevation/G2/07.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (12,"imgs/elevation/G2/08.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (12,"imgs/elevation/G2/09.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into ChieldCatImages (CC_ID,Src) values (12,"imgs/elevation/G2/10.jpg")');  /*---  PLAN 500-750 G + 2---*/


		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (20,"imgs/SF/01.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (21,"imgs/SF/02.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (22,"imgs/SF/01.jpg")');  /*---  PLAN 500-750 G + 2---*/
		tx.executeSql('insert into SuCatImages (SC_ID,Src) values (23,"imgs/SF/02.jpg")');  /*---  PLAN 500-750 G + 2---*/


		
		
		
		Log_('Inserting Complite'); 
		LoadCreateCats()
	}
	
	
	function ShowSelectedcat (PM_ID,Title)
	{
		/* Showing Select Cat */
		Log_('Showing Select Cat, ID: '+ PM_ID+ ', Title : ' + Title); 
		
		window.location="#MainCat?PM_ID="+ PM_ID;
		$('#MainCatTitle').text(Title);
		
		
		
		Log_('Loading Sub Cats for ' + Title); 
		_This_Sub_Cat_ID=PM_ID;
		var db = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
        db.transaction(LoadSubCats, errorCB, successCB);	
	}
	function LoadSubCats(tx)
	{
		Log_("_This_Sub_Cat_ID = "+ _This_Sub_Cat_ID);
		tx.executeSql('select sc.*,(select ca.src  from SuCatImages ca  where ca.SC_ID=sc.SC_ID ) as src ,(select count(cc.CC_ID) from ChieldCats cc where cc.SC_ID=sc.SC_ID ) as "CC" from SuCats sc where sc.PM_ID= ' +_This_Sub_Cat_ID,[],GetSubCats,errorCB ); 
		Log_('Loading  Sub Cats Complite');
	}
	function GetSubCats(tx,result)
	{
		Log_('Fetching Sub Cat Records');
		var len = result.rows.length;
		
		var _tabls="";
		var _MainList='<div data-role="navbar"><ul>';
		
		
		if (len >0)
		{
			for (var i=0; i< len; i++)
			{
				_MainList+='<li><a OnClick="LoadImagesForMe('+ result.rows.item(i).SC_ID +')" href="#TB_'+ result.rows.item(i).SC_ID  +'" data-ajax="false"><small>'+ result.rows.item(i).Title +'</small></a></li>';
				
				if (result.rows.item(i).src==null)
				{
				_tabls+='<div class="This_SubCat" sc-id='+ result.rows.item(i).SC_ID  +' id="TB_'+ result.rows.item(i).SC_ID +'" >Images Not found';	
				}
				else	
				{
					_tabls+='<div class="This_SubCat MyLoaderDiv_'+ result.rows.item(i).SC_ID +'" sc-id='+ result.rows.item(i).SC_ID  +' id="TB_'+ result.rows.item(i).SC_ID +'" ><img style="width:100%;	" onclick="ShowImage(this)" src="'+ result.rows.item(i).src +'">';	
				}
				
				if (result.rows.item(i).CC !=0)
				{
					//console.log('result.rows.item(i).CC= ' + result.rows.item(i).CC);
					//_tabls +='<a href="" onclick="ShowElevation('+ result.rows.item(i).SC_ID +')" data-role="botton">Elevation</a>';
				}
				_tabls +='</div>'
			}
			_MainList+='</ul>';
			
			$('#SubTabView').html('<div data-role="tabs" id="tabs">'+_MainList + _tabls + '</div></div>').trigger('create');
			
			
		}
		else
		{
			$('#SubTabView').html('No Sub Catagories Defined');	
		}
		
		if (len==1)
		{
			console.log('LoadImagesForMe');
			LoadImagesForMe( result.rows.item(0).SC_ID);
		}
	}
	
	function LoadImagesForMe(SC_ID)
	{
		_LoaderSC_ID=SC_ID;
		var db = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
        db.transaction(GetImages_By_SC, errorCB, successCB);
	}
	function GetImages_By_SC(tx)
	{
		tx.executeSql('select si.*,(select count(cc.CC_ID) from ChieldCats cc where cc.SC_ID=si.SC_ID ) as "CC" from SuCatImages si where si.SC_ID='+ _LoaderSC_ID + " order by CI_ID desc ",[],GetImages_By_SC_Result,errorCB);
	}
	function GetImages_By_SC_Result(tx,result)
	{
		var len=result.rows.length;
		var anotherHTM='';
	
		console.log('------------------' + _LoaderSC_ID);
		
		var _rtHrtml='<div id="touchgallery1" class="touchgallery">';
		_rtHrtml+='<ul>';
		for(var i=0; i < len;i++)
		{
			_rtHrtml+='<li>';
			_rtHrtml+='<img style="" class="Image-tap-hold" onclick="ShowImage2(this)" style="width:100%;" src="'+ result.rows.item(i).Src +'" />';
			
			_rtHrtml+='<div class="ui-grid-b" data-theme="b">';
			
			
			var testStr = result.rows.item(i).Src ;
			console.log(testStr);
			
			if(testStr.indexOf("http") >= 0)
			{
			_rtHrtml+='<div class="ui-block-a"><a class="ui-link ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all" onclick="ShareImage(\''+result.rows.item(i).Src +'\')"  href="">Share</a></div>';	
			}
			else
				
			{
			_rtHrtml+='<div class="ui-block-a"><a class="ui-link ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all" onclick="ShareImage(\'www/'+result.rows.item(i).Src +'\')"  href="">Share</a></div>';
			}
			
			_rtHrtml+='<div class="ui-block-b"><a class="ui-link ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all" onclick="ShowImage2(this)" src="'+ result.rows.item(i).Src +'" href="">View</a></div>';
			_rtHrtml+='<div class="ui-block-c"><a class="ui-link ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all" image-id="'+ result.rows.item(i).Src +'" onclick="DeleteImage(this)" href="">Delete</a></div>';
			
			_rtHrtml+='</div>';
			_rtHrtml+='</li>';
			
			if (result.rows.item(i).CC !=0)
			{
				anotherHTM ='<a href="" onclick="ShowElevation('+ _LoaderSC_ID +')" data-role="botton" class="ui-link ui-btn ui-btn">Elevation</a>';
			}
			
			var LdMore_Html='<a href="JavaScript:Return False()" OnClick="LoadNetSc_Images('+ _LoaderSC_ID +')" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all">Load More </a>';
			
			
		}
		
	
		
		_rtHrtml+='</ul>';
		_rtHrtml+='</div>';
		
		

		
		$('.MyLoaderDiv_'+ _LoaderSC_ID).html(_rtHrtml +  LdMore_Html + anotherHTM);
		fireSliderScript();
	}
	
	function LoadNetCC_Images(_LoaderCC)
	{
		_NetCc_ID=	_LoaderCC;
		console.log("_NetCc_ID="+ _NetCc_ID);
		//var db = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
	    //db.transaction(DownloadCCImage, errorCB, successCB);

	    window.location="#LoaderPageEle";
		$('#btnNetLoadmoreEle').css('display','none');
		$('#ImageLoaderEle').html("<span id='netloadinspan'>Loading ...</span>");
		LoadtenEleImages(_NetCc_ID,0);
	}


	function LoadtenEleImages(CC_ID,CI_ID)
	{
		console.log("LoadtenEleImages");
		var _loadedImages=[]
		var li=0;
		var Last_CiID=CI_ID;
		var _IMG_ldr_html='<ul class="ui-listview" style="width:100%;margin-left:auto;margin-right:auto;">';
		var flickerAPI =_MainUrl+ "services/loadchieldimages.php?CC_ID="+ CC_ID +"&CCI_ID=" + CI_ID ;
		$.getJSON( flickerAPI, function(json)
		{
			var totalBanners=json.length;
			var _Existing_BannerSrc="";
			$.each(json, function(idx, obj) {
				if (obj.Src==undefined)
				{
				
				}
				else
				{
					console.log( obj.Src);
					_loadedImages[li]={CI_ID:[obj.CI_ID],Src:[obj.Src],SC_ID:[obj.SC_ID]};
					_IMG_ldr_html +='<li class="ui-li-has-thumb"><span href="#" class="ui-btn "><img width="100" height="100" src="'+ _MainUrl +'/Advts/Baby_'+ obj.Src +'"> <a href="JavaScript:Return False()" onclick="downloadNetEleImage(this)" cc-id="'+obj.CC_ID+'" CI-ID="'+obj.CCI_ID+'"  src="'+obj.Src+'" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all ui-btn-active">download </a> </span></li>';
					Last_CiID=obj.CCI_ID;
					li=li+1;
					
					
				}
			});	
			
			_IMG_ldr_html+='</ul>';
			$('#btnNetLoadmoreEle').css('display','Block');
			$('#netloadinspan').css('display','none');
			$('#btnNetLoadmoreEle').attr('ci-id',Last_CiID);
			$('#btnNetLoadmoreEle').attr('cc-id',CC_ID);
			$('#ImageLoaderEle').html($('#ImageLoader').html()+_IMG_ldr_html);
		})	
	}

	function loadnetmoreEle(t)
	{
		var SC_ID=$(t).attr('cc-id');	
		var CI_ID=$(t).attr('ci-id');	
		console.log(SC_ID);
		
		
		
		LoadtenImages(SC_ID,CI_ID)
	}
	
function downloadNetEleImage(t)
	{
		//tx.executeSql("select IFNull((max(CCI_ID)),0) as 'MX' from chieldcatimages where CC_ID=" + _NetCc_ID,[],DownloadImageCCResult,errorCB);
		var CC_ID=$(t).attr('CC-ID');	
		var CI_ID=$(t).attr('CI-ID');	
		var src=$(t).attr('src');
		console.log(CC_ID);
		console.log(CI_ID);
		console.log(src);
		_Loaded_CI_ID=CI_ID;
		_NetCc_ID=CC_ID;
		_Loaded_CC_Src=_MainUrl +'/Advts/'+ src;
		var db5 = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
		db5.transaction(insertNewImageEleSrc, errorCB, successCB);
		console.log("downloadNetEleImage");
	}
	
	function insertNewImageEleSrc(tx)
	{
		console.log("insertNewImageSrc");
		tx.executeSql('insert into chieldcatimages (CCI_ID,CC_ID,Src) values ('+ _Loaded_CCI_ID +','+ _NetCc_ID +',"'+ _Loaded_CC_Src +'")');
		_Loaded_CCI_ID=0;
		_Loaded_CC_Src=0;
		//LoadImagesForMe(_NetSc_ID);
		LoadImagesForMeSub(_NetCc_ID);
	}

	function DownloadCCImage(tx)
	{
		console.log("DownloadCCImage");
		tx.executeSql("select IFNull((max(CCI_ID)),0) as 'MX' from chieldcatimages where CC_ID=" +_NetCc_ID,[],DownloadImageCCResult,errorCB);
	}



	function DownloadImageCCResult(t,r)
	{
			console.log("DownloadImageCCResult");
			$.mobile.loading( 'show', {
			text: 'Loading..',
			textVisible: false,
			theme: 'b',
			html: ""
			});
			
			
			var flickerAPI =_MainUrl+ "services/loadchieldimages.php?CC_ID="+ _NetCc_ID +"&CCI_ID="+ r.rows.item(0).MX ;
		$.getJSON( flickerAPI, function(json)
		{
			var totalBanners=json.length;
			var _Existing_BannerSrc="";
			$.each(json, function(idx, obj) {
				if ( json.length == 0 ) {
					alert('No More Images Available.');
    			}
				console.log("New Image= " + obj.Src);
				if (obj.Src==undefined)
				{
					alert('No More Images Available.');
				}
				else
				{
					//$('#loading_SC_'+_NetSc_ID).html('<img src="'+ _MainUrl +'/Advts/'+ obj.Src +'" />');
						_Loaded_CCI_ID=obj.CCI_ID;
						_Loaded_CC_Src=_MainUrl +'/Advts/'+ obj.Src;
						var db5 = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
						db5.transaction(insertNewCCIImageSrc, errorCB, successCB);
				}
			});	
		});	
			
	}
	
	function insertNewCCIImageSrc(tx)
	{
		console.log("insertNewImageSrc");
		tx.executeSql('insert into chieldcatimages (CCI_ID,CC_ID,Src) values ('+ _Loaded_CCI_ID +','+ _NetCc_ID +',"'+ _Loaded_CC_Src +'")');
		_Loaded_CCI_ID=0;
		_Loaded_CC_Src='';
		LoadImagesForMeSub(_NetCc_ID);
	}
	
	function LoadNetSc_Images(_LoaderSC)
	{
		
		_NetSc_ID=_LoaderSC;
		
		//var db = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
	    //db.transaction(DownloadImage, errorCB, successCB);
		
		window.location="#LoaderPage";
		$('#btnNetLoadmore').css('display','none');
		$('#ImageLoader').html("<span id='netloadinspan'>Loading ...</span>");
		
		
		LoadtenImages(_NetSc_ID,0);
		
	}
	
	function LoadtenImages(SC_ID,CI_ID)
	{
		var _loadedImages=[]
		var li=0;
		var Last_CiID=CI_ID;
		var _IMG_ldr_html='<ul class="ui-listview" style="width:100%;margin-left:auto;margin-right:auto;">';
		var flickerAPI =_MainUrl+ "services/loadsubimage.php?SC_ID="+ SC_ID +"&CI_ID=" + CI_ID ;
		$.getJSON( flickerAPI, function(json)
		{
			var totalBanners=json.length;
			var _Existing_BannerSrc="";
			$.each(json, function(idx, obj) {
				if (obj.Src==undefined)
				{
				
				}
				else
				{
					console.log( obj.Src);
					_loadedImages[li]={CI_ID:[obj.CI_ID],Src:[obj.Src],SC_ID:[obj.SC_ID]};
					_IMG_ldr_html +='<li class="ui-li-has-thumb"><span href="#" class="ui-btn "><img width="100" height="100" src="'+ _MainUrl +'/Advts/Baby_'+ obj.Src +'"> <a href="JavaScript:Return False()" onclick="downloadNetImage(this)" sc-id="'+obj.SC_ID+'" CI-ID="'+obj.CI_ID+'"  src="'+obj.Src+'" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all ui-btn-active">download </a> </span></li>';
					Last_CiID=obj.CI_ID;
					li=li+1;
					
					
				}
			});	
			
			_IMG_ldr_html+='</ul>';
			$('#btnNetLoadmore').css('display','Block');
			$('#netloadinspan').css('display','none');
			$('#btnNetLoadmore').attr('ci-id',Last_CiID);
			$('#btnNetLoadmore').attr('sc-id',SC_ID);
			$('#ImageLoader').html($('#ImageLoader').html()+_IMG_ldr_html);
		})	
	}
	function loadnetmore(t)
	{
		var SC_ID=$(t).attr('sc-id');	
		var CI_ID=$(t).attr('ci-id');	
		console.log(SC_ID);
		
		
		
		LoadtenImages(SC_ID,CI_ID)
	}
	
	function downloadNetImage(t)
	{
		var SC_ID=$(t).attr('SC-ID');	
		var CI_ID=$(t).attr('CI-ID');	
		var src=$(t).attr('src');
		console.log(SC_ID);
		console.log(CI_ID);
		console.log(src);
		_Loaded_CI_ID=CI_ID;
		_NetSc_ID=SC_ID;
		_Loaded_SC_Src=_MainUrl +'/Advts/'+ src;
		var db5 = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
		db5.transaction(insertNewImageSrc, errorCB, successCB);
	}
	
	
	function DownloadImage(tx)
	{
		tx.executeSql("select IFNull((max(CI_ID)),0) as 'MX' from sucatimages where SC_ID=" +_NetSc_ID,[],DownloadImageResult,errorCB);
	}
	
	function DownloadImageResult(tx,r)
	{
		$.mobile.loading( 'show', {
			text: 'Loading..',
			textVisible: false,
			theme: 'b',
			html: ""
			});
		
		
		var flickerAPI =_MainUrl+ "services/loadsubimage.php?SC_ID="+ _NetSc_ID +"&CI_ID="+ r.rows.item(0).MX ;
		$.getJSON( flickerAPI, function(json)
		{
			var totalBanners=json.length;
			var _Existing_BannerSrc="";
			$.each(json, function(idx, obj) {
				if ( json.length == 0 ) {
					alert('No More Images Available.');
    			}
				console.log("New Image= " + obj.Src);
				if (obj.Src==undefined)
				{
					alert('No More Images Available.');
				}
				else
				{
					$('#loading_SC_'+_NetSc_ID).html('<img src="'+ _MainUrl +'/Advts/'+ obj.Src +'" />');
						_Loaded_CI_ID=obj.CI_ID;
						_Loaded_SC_Src=_MainUrl +'/Advts/'+ obj.Src;
						var db5 = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
						db5.transaction(insertNewImageSrc, errorCB, successCB);
				}
			});	
		});	
	}
	
	function insertNewImageSrc(tx)
	{
		console.log("insertNewImageSrc");
		tx.executeSql('insert into SuCatImages (CI_ID,SC_ID,Src) values ('+ _Loaded_CI_ID +','+ _NetSc_ID +',"'+ _Loaded_SC_Src +'")');
		_Loaded_CI_ID=0;
		_Loaded_SC_Src=0;
		LoadImagesForMe(_NetSc_ID);
	}



	
	function DeleteImage(t)
	{
		var IMG_ID=$(t).attr('image-id');	
		var r = confirm("Are you sure ? ");
		if (r == true) {
			_SubCatDeletableImage=IMG_ID;
			var db = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
	        db.transaction(DeleteImage_TX, errorCB, successCB);
		} else {
		}	
	}
	
	function DeleteImage_TX(tx)
	{
		tx.executeSql("delete from SuCatImages where Src='"+ _SubCatDeletableImage +"'");
		LoadImagesForMe(_LoaderSC_ID);
	}
	
/*	----------------------------------------------------------------------- Sub Cat Image Loading  -----------------------------------------------------------------------*/
	function LoadImagesForMeSub(CC_ID)
	{
		_LoaderCC_ID=CC_ID;
		console.log("LoadImagesForMeSub | _LoaderCC_ID = " + _LoaderCC_ID);
		var db = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
        db.transaction(GetImages_By_CC, errorCB, successCB);
	}
	function GetImages_By_CC(tx)
	{
		console.log("Get_Images_ny_CC");
		Log_("_LoaderCC_ID=" + _LoaderCC_ID);
		tx.executeSql('select * from ChieldCatImages  where CC_ID=='+ _LoaderCC_ID + ' order by CCI_ID desc',[],GetImages_By_CC_Result,errorCB);
	}
	
	function GetImages_By_CC_Result(tx,result)
	{
		console.log("GetImages_By_CC_Result");
		var len=result.rows.length;
		Log_("len= " + len);
		var anotherHTM='';
		var _rtHrtml='<div id="touchgallery2" class="touchgallery">';
		_rtHrtml+='<ul>';
		
		console.log(result);
		
		for(var i=0; i < len;i++)
		{
			_rtHrtml+='<li>';
			_rtHrtml+='<img style="" class="Image-tap-hold" onclick="ShowImage2(this)" style="width:100%;" src="'+ result.rows.item(i).Src +'" />';
			
			_rtHrtml+='<div class="ui-grid-b" data-theme="b">';
			
			_rtHrtml+='<div class="ui-block-a"><a class="ui-link ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all" onclick="ShareImage(\'www/'+result.rows.item(i).Src +'\')"  href="">Share</a></div>';
			_rtHrtml+='<div class="ui-block-b"><a class="ui-link ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all" onclick="ShowImage2(this)" src="'+ result.rows.item(i).Src +'" href="">View</a></div>';
			_rtHrtml+='<div class="ui-block-c"><a class="ui-link ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all" image-id="'+ result.rows.item(i).Src +'" onclick="deleteSubImage(this)" href="">Delete</a></div>';
			
			_rtHrtml+='</div>';
			
			_rtHrtml+='</li>';

			
		}
		_rtHrtml+='</ul>';
		_rtHrtml+='</div>';
		
		
		var LdMore_Html='<a href="JavaScript:Return False()" OnClick="LoadNetCC_Images('+ _LoaderCC_ID +')" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all">Load More </a>';
		
		
		
		$('.MySubLoaderDiv_'+ _LoaderCC_ID).html(_rtHrtml + LdMore_Html);
		fireSliderScript2();
	}
	
	function deleteSubImage(t)
	{
		var IMG_ID=$(t).attr('image-id');	
		var r = confirm("Are you sure ? ");
		console.log(r);
		if (r == true) {
			_SubCatDeletableImage=IMG_ID;
			var db = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
	        db.transaction(DeleteSubImage_TX, errorCB, successCB);
		} else {
		}
		
	}
	function DeleteSubImage_TX(tx)
	{
		tx.executeSql("delete from ChieldCatImages where Src='"+ _SubCatDeletableImage +"'");
		LoadImagesForMeSub(_LoaderCC_ID);
	}
	
	function ShowImage3(t)
	{
		var src=$(t).attr('src');
		
		
		var wh=$(window).height();
			$('#iframeID').html('');
			window.localStorage.setItem("src",src);
			var _iframeHtml='<iframe frameborder="0" style="height:'+wh+'px;width:100%;" src="imageview/demo/pinchzoom.html" id="MainImagezoomFrame" style="width:100%;"></iframe>';
			$('#iframeID').html('');
			$('#iframeID').html(_iframeHtml);
			
			window.location='#ImageView';
	}
	
	
	function DeleteExp(t)
	{
		var r = confirm("Are you sure ? ");
		if (r == true)
		{
		
			var src=$(t).attr('src');
			_this_DeletableSrc=src;
			
			console.log("_this_DeletableSrc="+ _this_DeletableSrc)
			
			var db = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
			db.transaction(DeleteExpFire, errorCB, successCB);	
			}
	}
	var _this_DeletableID=0;
	
	function DeleteFullExp(t)
	{
		var r = confirm("Are you sure ? ");
		if (r == true)
		{
		
			_this_DeletableID=t;
			
			console.log("_this_DeletableID="+ _this_DeletableID)
			
			var db = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
			db.transaction(DeleteExpFullFire, errorCB, successCB);	
		}
	}
	
	function DeleteExpFullFire(tx)
	{
		var Q='delete from MyWorks where W_ID="' + _this_DeletableID + '"';
		console.log("Q=" + Q);
		tx.executeSql(Q);
		_this_DeletableID=0;
		geallWorks();
		
	}
	
	
	function DeleteExpFire(tx)
	{
		var Q='delete from WorkImages where Src="' + _this_DeletableSrc + '"';
		console.log("Q=" + Q);
		tx.executeSql(Q);
		geallWorks();
	}
	
	
	function ShowImage2(t)
	{
		var src=$(t).attr('src');
		
		
		var wh=$(window).height();
			$('#iframeID').html('');

			var _link='';
			if (ValidURL(src)==true)
			{
					_link=src;
			}
			else
			{
				_link='../../'+src;
			}

			window.localStorage.setItem("src", _link);
			var _iframeHtml='<iframe frameborder="0" style="height:'+wh+'px;width:100%;" src="imageview/demo/pinchzoom.html" id="MainImagezoomFrame" style="width:100%;"></iframe>';
			$('#iframeID').html('');
			$('#iframeID').html(_iframeHtml);
			
			window.location='#ImageView';
	}

	function ValidURL(str) {
			console.log(str);
	 	if (str.indexOf("http://")>-1)
	 	{
	 			return true;
	 	}
	 	else
	 	{
	 			return false;
	 	}
	}
	
	
	function ShareImage(IMG_U)
	{
		socialsharingDemo(IMG_U);
	}
	
	function fireSliderScript2()
	{
		$('div#touchgallery2').touchgallery({ });
		$(".Image-tap-hold").on("taphold",function(){
		  Image_Holded($(this));
		});
	}
	
	function fireSliderScript()
	{
		$('div#touchgallery1').touchgallery({ });
		$(".Image-tap-hold").on("taphold",function(){
		  Image_Holded($(this));
		});
	}
	function Image_Holded(sel)
	{
		
	}
	
	function ShowElevation(SC_ID)
	{
		window.location="#Elevation";
		_to_Eled_SC_ID=SC_ID;
		
		var db = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
        db.transaction(GetScTitle, errorCB, successCB);	
	}
	
	function GetScTitle(tx)
	{
		Log_("_to_Eled_SC_ID : "+ _to_Eled_SC_ID);
		tx.executeSql('select * from SuCats where SC_ID='+ _to_Eled_SC_ID,[],GetScTitle_Result,errorCB);
	}
	function GetScTitle_Result(tx,result)
	{
		$('#ElCatTitle').html($('#MainCatTitle').text() + ' > '+ result.rows.item(0).Title);
		var db5 = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
        db5.transaction(CreateChirldTabs, errorCB, successCB)
	}
	function CreateChirldTabs(tx)
	{
		tx.executeSql('select cc.* ,IFNull((select ca.src  from ChieldCatImages  ca  where ca.CC_ID=cc.CC_ID) ,0) as src  from ChieldCats cc where cc.SC_ID='+ _to_Eled_SC_ID,[],CreateChirldTabs_Result,errorCB) + ' limit 1';
	}
	
	function CreateChirldTabs_Result(tx,result)
	{
		Log_('Fetching Chield Cat Records');
		var len = result.rows.length;
		
		var _tabls="";
		var _MainList='<div data-role="navbar"><ul>';
		
		
		if (len >0)
		{
			for (var i=0; i< len; i++)
			{
				_MainList+='<li><a OnClick="LoadImagesForMeSub('+ result.rows.item(i).CC_ID +')" href="#TBC_'+ result.rows.item(i).CC_ID  +'" data-ajax="false"><small>'+ result.rows.item(i).Title +'</small></a></li>';
				
				if (result.rows.item(i).src==null)
				{
				_tabls+='<div class="This_SubCat MySubLoaderDiv_'+  result.rows.item(i).CC_ID +'" sc-id='+ result.rows.item(i).CC_ID    +' id="TBC_'+ result.rows.item(i).CC_ID   +'" >Images Not found';	
				}
				else	
				{
					_tabls+='<div class="This_SubCat  MySubLoaderDiv_'+  result.rows.item(i).CC_ID +'"" sc-id='+ result.rows.item(i).CC_ID    +' id="TBC_'+ result.rows.item(i).CC_ID   +'" ><img style="width:100%;	" onclick="ShowImage(this)" src="'+ result.rows.item(i).src +'">';	
				}
				
				
				_tabls +='</div>'
			}
			_MainList+='</ul>';
			
			$('#ChieldTabView').html('<div data-role="tabs" id="tabs">'+_MainList + _tabls + '</div></div>').trigger('create');
		}
		else
		{
			$('#ChieldTabView').html('No Sub Catagories Defined');	
		}	
	}
	
	
	function ShowImage(Image_)
	{
		var wh=$(window).height();
			$('#iframeID').html('');
			var _iframeHtml='<iframe frameborder="0" style="height:'+wh+'px;width:100%;" src="imageview/demo/pinchzoom.html?parameter=../../'+   Image_ +'" id="MainImagezoomFrame" style="width:100%;"></iframe>';
			$('#iframeID').html('');
			$('#iframeID').html(_iframeHtml);
			
			window.location='#ImageView';	
	}
	
	function fileinputClick()
	{
		 var fil = document.getElementById("fileinput");
   alert(fil.value);
            //alert(path);
	
		console.log(path);
	}
	
	
	function getMyInfo()
	{
		var db = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
        db.transaction(getMyInfoExec, errorCB, successCB);	
	}
	function getMyInfoExec(tx)
	{
		tx.executeSql('select * from MyInfo',[],getMyInfo_Result,errorCB);		
	}
	function getMyInfo_Result(t,r)
	{
		var length=r.rows.length;
		console.log("length=" + length);
		if (length !=0)
		{
			$('#txtMobile').val(r.rows.item(0).Mobile_);
			$('#txtName').val(r.rows.item(0).Name_);
			$('#txtEmail').val(r.rows.item(0).Email_);
		}
	}
	
	function saveMyDetails()
	{
		var db = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
        db.transaction(saveMyDetailsExec, errorCB, successCB);	
	}
	
	function saveMyDetailsExec(tx)
	{
		tx.executeSql('delete from MyInfo');
		tx.executeSql('insert into MyInfo (Name_,Mobile_,Email_)values ("' + $('#txtName').val() + '","'+ $('#txtMobile').val() +'","'+ $('#txtEmail').val() +'")');
		alert('Info Saved');
	}
	
	
	
	function SaveWork()
	{
		if (Edit_ID==0)		
		{
			var db1 = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
       		db1.transaction(SaveWorkExec, errorCB, successCB);	
		}
		else
		{
			var db1 = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
       		db1.transaction(UpdateExec, errorCB, successCB);		
		}
	}
	
	function UpdateExec(tx)
	{
		tx.executeSql('update MyWorks set Address_="'+ $('#txtAddress_').val()  +'" ,Area_="'+  $('#txtArea_').val() +'" ,Cost_="'+  $("#txtCost_").val()  +'" , Duretion_="'+ $("#txtDuretion_").val()   +'" ,Name_="'+ $("#txtName_").val() +'" where W_ID=' + Edit_ID,[],UpdateExec_Success,SaveWorkExecError);	
	}
	function UpdateExec_Success()
	{
		Edit_ID=0;
		clear1();
		alert('Info Updated');
		geallWorks();
	}
	
	function SaveWorkExec(tx)
	{
		
		if (_ImageData=='')
		{
			_ImageData='images/INA.png';	
		}
		tx.executeSql('insert into MyWorks (Address_,Area_,Cost_,Duretion_,Name_) values ("'+  $('#txtAddress_').val() +'","'+ $('#txtArea_').val() +'","'+ $("#txtCost_").val() +'","'+ $("#txtDuretion_").val() +'","'+ $("#txtName_").val() +'")',[],SaveWorkExecSuccess,SaveWorkExecError);	
		
		tx.executeSql('select W_ID as "MAX_" from MyWorks ',[],getMyWordMax,errorCB);
		
		
		
		
		
		alert('Info Saved');
		_ImageData='';
		
		//$('#MyImages').html('');
		clear1();
	}
	
	function clear1()
	{
		$('#txtAddress_').val('');
		$('#txtArea_').val('');
		$("#txtCost_").val('');
		$("#txtDuretion_").val('');
		$("#txtName_").val('');	
	}
	
	function SaveWorkExecError(err)
 	{
		alert("Error processing SQL: SaveWorkExecError "+err.code);
		
	}
	
	var _q='';
	var _q_=[];
	
	
	function getMyWordMax(t,r)
	{
		var W_ID=r.rows.item(0).MAX_;
		//alert("W_ID=" + W_ID);
		
		var iim_ax=0;
		
		_q='';
		$(".MySepImage").each(function(){
			//alert($(this).attr('src'));
				
				_q+='insert into WorkImages (W_ID,Src) values('+ W_ID +',"'+ $(this).attr('src') +'"); ';
				
				_q_[iim_ax]={Q:'insert into WorkImages (W_ID,Src) values('+ W_ID +',"'+ $(this).attr('src') +'"); '};
				
				iim_ax=iim_ax+1;
		});
		
		 var db1 = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
       	 db1.transaction(getMyWordImages, errorCB, successCB);	
		 
	}
	function getMyWordImages(tx)
	{
		//alert(_q_.length);
		
		for(var i=0; i < _q_.length;i++)
		{
			tx.executeSql(_q_[i].Q,[],getMyWordMaxSuccess,getMyWordMaxError);
		}
		$('#MyImages').html('');
	}
	
	
	function getMyWordMaxError(err)
	{
		alert("getMyWordMaxError: "+err.code);
		
	}
	function getMyWordMaxSuccess()
	{
		
	}
	
	function SaveWorkExecSuccess(t,r)
	{
		console.log(r);
	}
	
	
	function geallWorks()
	{
		var db15 = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
        db15.transaction(geallWorksExec, errorCB, successCB);	
	}
	function geallWorksExec(tx)
	{
		tx.executeSql("select * from MyWorks",[],geallWorksExecResult,errorCB);
	}
	
	
	var Edit_ID=0;
	
	function EditExp(W_ID)
	{
		Edit_ID=W_ID;
		var db15 = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
        db15.transaction(getExpById, errorCB, successCB);	
	}	
	function getExpById(tx)
	{
		tx.executeSql("select * from MyWorks where W_ID="+ Edit_ID,[],getExpById_Result,errorCB);
	}
	
	function getExpById_Result(t,r)
	{
		var length= r.rows.length;
		if (length !=0)
		{
			console.log(r.rows.item(0));	
			window.location="#AddMyWork";
			$('#txtName_').val(r.rows.item(0).Name_);
			$('#txtAddress_').val(r.rows.item(0).Address_);
			$('#txtArea_').val(r.rows.item(0).Area_);
			$('#txtCost_').val(r.rows.item(0).Cost_);
			$('#txtDuretion_').val(r.rows.item(0).Duretion_);
			$('.DisEdit').css('display','none');
		}
	}
		
	
	function geallWorksExecResult(tx,r)
	{
		var length= r.rows.length;
		var RtHtml='';
		
		$('#My_works').html('');
		
	

		for (var i=0; i < length; i++ )
		{
		
			RtHtml+='<table><tr><td><h2>'+ r.rows.item(i).Name_ +'</h2></td> <td><a class="ui-btn ui-shadow ui-corner-all ui-icon-edit ui-btn-icon-notext" Onclick="EditExp('+  r.rows.item(i).W_ID +')">Edit</a> </td> <td><a class="ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext" Onclick="DeleteFullExp('+ r.rows.item(i).W_ID +')">Delete</a> </td></tr></table>';
			RtHtml+='<hr>';
			
			RtHtml+='<table style="width:100%;">';
			RtHtml+='<tr>';
			
			RtHtml+='	<td>';
			RtHtml+='Address';
			RtHtml+='	</td>';
			RtHtml+='	<td>';
			RtHtml +=r.rows.item(i).Address_ ;
			RtHtml+='	</td>';
			RtHtml+='</tr>';
			
			RtHtml+='<tr>';
			RtHtml+='	<td>';
			RtHtml+='Area';
			RtHtml+='	</td>';
			RtHtml+='	<td>';
			RtHtml +=r.rows.item(i).Area_ ;
			RtHtml+='	</td>';
			RtHtml+='</tr>';
			
			RtHtml+='<tr>';
			RtHtml+='	<td>';
			RtHtml+='Cost';
			RtHtml+='	</td>';
			RtHtml+='	<td>';
			RtHtml +=r.rows.item(i).Cost_ ;
			RtHtml+='	</td>';
			RtHtml+='</tr>';
			
			
			RtHtml+='<tr>';
			RtHtml+='	<td>';
			RtHtml+='Duration ';
			RtHtml+='	</td>';
			RtHtml+='	<td>';
			RtHtml +=r.rows.item(i).Duretion_ ;
			RtHtml+='	</td>';
			RtHtml+='</tr>';
			
			RtHtml+='<tr>';
			RtHtml+='	<td>';
			RtHtml+='Image';
			RtHtml+='	</td>';
			RtHtml+='	<td>';
			
			
			var _WI_ID=r.rows.item(i).W_ID;
			
			
			var ImgSrc='';
			
			
			if (r.rows.item(i).Image_!='NAI')
			{
				//RtHtml +='<table><tr><td>  <img style="height:100px" src="'+ r.rows.item(i).Image_  +'" /> </td> <td> <a class="ui-link ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all ui-btn-active" onclick="ShareImage(\''+r.rows.item(i).Image_ +'\')" href="#">Share</a>   <a class="ui-link ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all ui-btn-active" onclick="ShowImage3(this)" src="'+ r.rows.item(i).Image_ +'" href="">View</a> </td></tr></table>';
				//RtHtml +='<img style="height:100px" src="'+ r.rows.item(i).Image_  +'" />';
				ImgSrc=r.rows.item(i).Image_ ;
			}
			else
			{
				//RtHtml +='<table><tr><td>  <img style="height:100px" src="images/INA.png" /> </td> <td> <a class="ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all " onclick="ShareImage(\''+r.rows.item(i).Image_ +'\')" href="#">Share</a>   <a class="ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all " onclick="ShowImage3(this)" src="'+ r.rows.item(i).Image_ +'" href="">View</a> </td></tr></table>';
				//RtHtml +='<img style="height:100px" src="images/INA.png" /> ';
				//ImgSrc='images/INA.png';
			}
			
			RtHtml +='</td>';
			RtHtml+='</tr>';
			
			RtHtml+='<tr>';
			RtHtml +='<td colspan="2">';
			
			RtHtml +='<a class="ui-mini ui-btn ui-btn-b ui-shadow ui-corner-all " id="MyImagesA" onclick="ShowMyImages(this,'+ _WI_ID +')" href="#">Show Images</a><span id="MyImagesSpan" style="display:none"></span>';

			/*RtHtml +='<div class="ui-grid-b" data-theme="b">';
			RtHtml +='		<div class="ui-block-a">';
			RtHtml +='			<a class="ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all " onclick="ShareImage2(\''+ImgSrc +'\')" href="#">Share</a>';
			RtHtml +='		</div>';
			RtHtml +='		<div class="ui-block-b">';
			RtHtml +='			<a class="ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all " onclick="ShowImage3(this)" src="'+ ImgSrc +'" href="">View</a>';
			RtHtml +='		</div>';
			RtHtml +='		<div class="ui-block-c">';
			RtHtml +='			<a class="ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all " onclick="DeleteExp(this)" src="'+ ImgSrc +'" href="">Delete</a>';
			RtHtml +='		</div>';
			RtHtml +='';
			RtHtml +='</div>';*/
			
			
			RtHtml+='	</td>';
			RtHtml+='</tr>';
			
			
			
			
			
			RtHtml+='</table>';
		}
		
		RtHtml +='';
		RtHtml +='';
		RtHtml +='<br/>';
		
		$('#My_works').html(RtHtml);
	}
	
	
var _Link_This;
var _W_ID=0;

	function ShowMyImages(t,WI_ID)
	{
		//alert("ShowMyImages");
		var db15 = window.openDatabase(DBName, "1.0", "Cordova Demo", 200000);
        db15.transaction(getMyImages, errorCB, successCB);	
		_Link_This=t;
		_W_ID=WI_ID;
	}
	function getMyImages(tx)
	{
		//alert("getMyImages");
		tx.executeSql("select * from WorkImages where W_ID="+ _W_ID,[],getMyImages_Result,errorCB);
		_W_ID=0;
	}
	function getMyImages_Result(t,r)
	{
		//alert("getMyImages_Result");
		var length= r.rows.length;
		//alert(length);
		var RtHtml='';

		for (var i=0; i < length; i++ )
		{		
			//alert(r.rows.item(i).Src);
			
			RtHtml +='<img style="height:100px" src="'+ r.rows.item(i).Src  +'" />';
			RtHtml +='<div class="ui-grid-b" data-theme="b">';
			RtHtml +='		<div class="ui-block-a">';
			RtHtml +='			<a class="ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all " onclick="ShareImage2(\''+r.rows.item(i).Src +'\')" href="#">Share</a>';
			RtHtml +='		</div>';
			RtHtml +='		<div class="ui-block-b">';
			RtHtml +='			<a class="ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all " onclick="ShowImage3(this)" src="'+ r.rows.item(i).Src +'" href="">View</a>';
			RtHtml +='		</div>';
			RtHtml +='		<div class="ui-block-c">';
			RtHtml +='			<a class="ui-mini ui-btn ui-btn-a ui-shadow ui-corner-all " onclick="DeleteExp(this)" src="'+ r.rows.item(i).Src +'" href="">Delete</a>';
			RtHtml +='		</div>';
			RtHtml +='';
			RtHtml +='</div>';
			
			//RtHtml+='<img style="width:50px;height:50px;" src="'+ r.rows.item(i).Src  +'" /><br>';
		}
		//$(_Link_This).html(RtHtml);
		$('#MyImagesSpan').html(RtHtml);
		$('#MyImagesSpan').css('display','block');
		
		$('#MyImagesA').css('display','none');
	}
	
	/*--------------------------------------Comman-------------------------------------------*/
	
	
	function Log_(v)
	{
		console.log(v);
	}
	
	function errorCB(err)
 	{
		alert("Error processing SQL: "+err.code);
		console.log("Error :::::" + err.code);
	}
	function successCB() 
	{

	}
	
	function ShareImage2(IMG_U)
	{
		socialsharingDemo2(IMG_U);
	}
	
	
	function socialsharingDemo2(ImgUrl) {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
		getMyInfo();
      // use a local image from inside the www folder:
//      window.plugins.socialsharing.share('Some text', 'Some subject', null, 'http://www.nu.nl');
//      window.plugins.socialsharing.share('Some text');

//      window.plugins.socialsharing.share('test', null, 'data:image/png;base64,R0lGODlhDAAMALMBAP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUKAAEALAAAAAAMAAwAQAQZMMhJK7iY4p3nlZ8XgmNlnibXdVqolmhcRQA7', null, function(e){alert("success: " + e)}, function(e){alert("error: " + e)});
      window.plugins.socialsharing.share('AMBUJA: HOUSE ARCHITECTURE APPLICATION IMAGE : Projet By '+ $('#txtName').val() + ' , Contact : ' + $('#txtMobile').val(),'' , ImgUrl, null, function(){console.log('ok')}, function(e){alert("error: " + e)});
	      }
  });
}
	/*------------------------------------------TAB Script---------------------------------------*/
	

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category_table_routes');
var menuRouter = require('./routes/menu_table_routes');
var menu_image_router = require('./routes/menu_image_router');
var employee_table_router = require('./routes/employee_table_router');
var cart_table_router = require('./routes/cart_table_routes');
var login_router = require('./routes/login_routes');
var signup_router = require('./routes/signup_routes');
var order_router = require('./routes/order_table_routes');
var charity_router = require('./routes/charity_table_routes');
var vendor_router = require('./routes/vendor_table_routes');
var order_to_vendor_router = require('./routes/orderToVendor_table_router');
var stock_router = require('./routes/stock_table_routes');
var category_delete = require('./routes/category_Delete');
var menu_delete = require('./routes/menu_delete');
var charity_delete = require('./routes/charity_delete');
var vendor_delete = require('./routes/vendor_delete');
var employee_delete = require('./routes/employee_delete');
var stock_delete = require('./routes/stock_delete');
var orderToVendor_delete = require('./routes/orderToVendor_delete');
var cart_delete = require('./routes/cart_delete');
var order_delete = require('./routes/order_delete');
var order_details_router = require('./routes/order_details_table_routes');
var order_details_delete = require('./routes/order_details_delete');
var category_delete = require('./routes/category_delete');
var demo_email_router = require('./routes/demomail_router');
var charity_email_router = require('./routes/charitymail_routes');
var forgetpass_email_router=require('./routes/forgetpassmail_routes');
var menu_catname_router = require('./routes/menu_catname_routes');
var menu_range_router = require('./routes/menu_range_routes');
var menu_asc_order_router = require('./routes/menu_by_asc_order');
var menu_desc_order_router = require('./routes/menu_by_desc_order');
var menu_min_to_max_price_router=require('./routes/menu_by_price_asc_order');
var menu_max_to_min_price_router=require('./routes/menu_by_price_desc_order');
var manu_data_with_name_router=require('./routes/menu_data_with_name_routes');
var menu_table_user_router=require('./routes/menu_table_userside_data_routes')
var home_page_slider_1_router=require('./routes/homepage_slider_1_data_routes');
var home_page_slider_2_router=require('./routes/homepage_slider_2_data_routes');
var order_details_by_orderid_router = require('./routes/order_detail_by_orderid_routes');
var order_table_detail_router = require('./routes/order_table_detail_routes');
var order_to_vendor_by_type_router = require('./routes/order_to_vendor_by_notdelivered');
var order_to_vendor_by_delivered_router = require('./routes/order_to_vendor_by_delivered');
var kitchenSide_get_router=require('./routes/Data_for_kitchen');
var monthlypayment=require('./routes/monthly_payment_routes');
var highestsellingitem=require('./routes/highest_selling_item_routes');
var monthlyselling=require('./routes/monthly_selling_routes');
var orderByStatusRouter=require('./routes/order_By_status');
var orderByInvoiceMode=require('./routes/invoice_by_mode');
var Stock_get_menuid_Router=require('./routes/stock_get_data_routes');
var stock_decrese_Router=require('./routes/stock_decrese_routes');
var stockmenu_Router=require('./routes/stockmenu_table_routes');
var stockmenu_delete_router=require('./routes/stockmenu_delete');
var feedback_Router=require('./routes/feedback_table_routes');
var feedback_count_Router=require('./routes/feedback_get_count_routes');
var get_Daily_Order_Router=require('./routes/gat_Daily_Order_Count_Routes');
var update_Payment_Status_Router=require('./routes/orderpaymentstatus_routes');
var vendor_login_Router=require('./routes/vendorlogin_routes');
var data_for_vendor_side_Router=require('./routes/dataForVendor_side_Router');
var deliveryStatusChange_Router=require('./routes/deliveryStatusChange_routes');
var stock_update_By_Vendor_Router=require('./routes/stock_update_By_Vendor_Router');
var vendor_Data_By_Email_Router=require('./routes/vendor_Data_By_Email');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/category', categoryRouter);
app.use('/categorydelete', category_delete);
app.use('/menu', menuRouter);
app.use('/menu_image', menu_image_router);
app.use('/employee', employee_table_router);
app.use('/cart', cart_table_router);
app.use('/login', login_router);
app.use('/signup', signup_router);
app.use('/order', order_router);
app.use('/charity', charity_router);
app.use('/vendor', vendor_router);
app.use('/ordertovendor', order_to_vendor_router);
app.use('/stock', stock_router);
app.use('/orderdetails', order_details_router);
app.use('/orderdetailsdelete', order_details_delete);
app.use('/categorydelete', category_delete);
app.use('/menuuser',menu_table_user_router)
app.use('/menudelete', menu_delete);
app.use('/menucatname', menu_catname_router);
app.use('/menurange', menu_range_router);
app.use('/menuasc', menu_asc_order_router);
app.use('/menudesc', menu_desc_order_router);
app.use('/menupriceasc',menu_min_to_max_price_router);
app.use('/menupricedesc',menu_max_to_min_price_router);
app.use('/menuWithName',manu_data_with_name_router);
app.use('/homeSlider1',home_page_slider_1_router);
app.use('/homeSlider2',home_page_slider_2_router);
app.use('/charitydelete', charity_delete);
app.use('/vendordelete', vendor_delete);
app.use('/userdelete', employee_delete);
app.use('/stockdelete', stock_delete);
app.use('/orderToVendordelete', orderToVendor_delete);
app.use('/cartdelete', cart_delete);
app.use('/orderdelete', order_delete);
app.use('/mail', demo_email_router);
app.use('/charitymail', charity_email_router);
app.use('/forgetpassmail',forgetpass_email_router);
app.use('/orderDetails', order_details_by_orderid_router);
app.use('/order_table_detail', order_table_detail_router);
app.use('/ordertovendorbytypenotdelivered', order_to_vendor_by_type_router);
app.use('/ordertovendorbytypedelivered', order_to_vendor_by_delivered_router);
app.use('/kitchenSide',kitchenSide_get_router)
app.use('/monthlypayment',monthlypayment);
app.use('/highestsellingitem',highestsellingitem);
app.use('/monthlyselling',monthlyselling);
app.use('/orderByStatus',orderByStatusRouter);
app.use('/invoice_mode',orderByInvoiceMode);
app.use('/stockMenuId',Stock_get_menuid_Router);
app.use('/stockDecrese',stock_decrese_Router);
app.use('/stockmenu',stockmenu_Router);
app.use('/stockmenudelete',stockmenu_delete_router);
app.use('/feedback',feedback_Router);
app.use('/feedbackcount',feedback_count_Router);
app.use('/getDailyOrder',get_Daily_Order_Router);
app.use('/paymentstatus',update_Payment_Status_Router);
app.use('/vendorlogin',vendor_login_Router);
app.use('/vendorSideData',data_for_vendor_side_Router);
app.use('/deliveryStatus',deliveryStatusChange_Router);
app.use('/stockUpdateByVendor',stock_update_By_Vendor_Router);
app.use('/vendorEmail',vendor_Data_By_Email_Router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

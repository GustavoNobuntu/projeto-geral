export const environment = { 
    applicationTitle: "ExemploTitulo", 
    backendUrl: "http://localhost:8080",
    frontendUrl: "https://localhost:4200",
    menuPath: "../../../../assets/dicionario/menu/menu.json", 

    // Dados Relacionados ao Azure AD B2C 
    authority: 'https://allystore.b2clogin.com/b46b5b87-a08e-487b-ae9b-fec172a9a90b/b2c_1_entradaEcadastro/v2.0/', 
    client_id:'46513151-51f8-4912-8051-8de83c3ef9ed', 
    redirect_uri: 'callback',
    post_logout_redirect_uri: 'logout',
    scope: 'https://allystore.onmicrosoft.com/46513151-51f8-4912-8051-8de83c3ef9ed/test.read openid',

    tenant_id: 'b46b5b87-a08e-487b-ae9b-fec172a9a90b', 
    provider: 'allystore.b2clogin.com', 

    signInPolitical: 'b2c_1_entradaEcadastro', 
    passwordResetPolitical: 'b2c_1_password_reset', 
    profileEditPolitical: 'b2c_1_profile_edit', 

    customersJSONPath: '../../../../assets/dicionario/customers.json', 

    employeesJSONPath: '../../../../assets/dicionario/employees.json', 

    inventoryTransactionTypesJSONPath: '../../../../assets/dicionario/inventoryTransactionTypes.json', 

    inventoryTransactionsJSONPath: '../../../../assets/dicionario/inventoryTransactions.json', 

    invoicesJSONPath: '../../../../assets/dicionario/invoices.json', 

    orderDetailsJSONPath: '../../../../assets/dicionario/orderDetails.json', 

    orderDetailsStatusJSONPath: '../../../../assets/dicionario/orderDetailsStatus.json', 

    ordersJSONPath: '../../../../assets/dicionario/orders.json', 

    ordersStatusJSONPath: '../../../../assets/dicionario/ordersStatus.json', 

    ordersTaxStatusJSONPath: '../../../../assets/dicionario/ordersTaxStatus.json', 

    salesReportsJSONPath: '../../../../assets/dicionario/salesReports.json', 

    shippersJSONPath: '../../../../assets/dicionario/shippers.json', 

    productsJSONPath: '../../../../assets/dicionario/products.json', 

    purchaseOrderDetailsJSONPath: '../../../../assets/dicionario/purchaseOrderDetails.json', 

    purchaseOrderStatusJSONPath: '../../../../assets/dicionario/purchaseOrderStatus.json', 

    purchaseOrdersJSONPath: '../../../../assets/dicionario/purchaseOrders.json', 

    suppliersJSONPath: '../../../../assets/dicionario/suppliers.json', 

    stringsJSONPath: '../../../../assets/dicionario/strings.json', 

    companyJSONPath: '../../../../assets/dicionario/company.json', 

    applicationJSONPath: '../../../../assets/dicionario/application.json', 

    companyApplicationTokenJSONPath: '../../../../assets/dicionario/companyApplicationToken.json', 
};

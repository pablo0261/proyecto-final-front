const Helpers = {
    Landing : "/",
    AccessAccount : "/accessAccount",

    /* Enrutador de MercadoPago */
    Success: "/success", //*adicionadas por Pablo
    Failure: "/failure", //*adicionadas por Pablo

    /* Cliente */
    HomeCustomerView: "/homeCustomerView",
    ProfileCustomerView: "/profileCustomerView",
    ConnectionsCustomerView: "/connectionsCustomerView",
    ReportsCustomerView: "/reportsCustomerView",
    UserDetail: "/user/:id",

    /* Proveedor */
    ProfileProviderView: "/profileProviderView",
    ConnectionsProviderView: "/connectionsProviderView",
    ReportsProviderView: "/reportsProviderView",
    StatsProviderView: "/statsProviderView", 
    Form: "/form/:component", 

    /* Admin*/
    AdminUsersView: "/AdminUsersView",
    AdminStatistics: "/AdminStatistics",
    AdminTables: "/AdminTables",
    AdminReports: "/AdminReports",

    /* Footer */
    FAQs: "/frequently-asked-questions",
    ConsultReport: "/consult-report",
}

export default Helpers

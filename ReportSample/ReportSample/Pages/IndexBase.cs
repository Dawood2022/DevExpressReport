using DevExpress.XtraReports.UI;
using Microsoft.AspNetCore.Components;
using ReportSample.Data;
using ReportSample.Reports;
using ReportSample.Reports.ReportSchemas;
using ReportSample.Services;
using System.Data;
using Microsoft.JSInterop;
namespace ReportSample.Pages
{
    public class IndexBase : ComponentBase
    {
        [Inject] IDataService DataService_Obj { get; set; }
        XtraReport Report { get; set; }
        [Inject] IJSRuntime jsRunTime { get; set;}
    [Inject]NavigationManager NavigationManager { get; set; }
        protected async override Task OnInitializedAsync()
        {
            
        }
        public async void PrintReport() 
        {
            List<USerDetails_Schema> UserList_RPT = new List<USerDetails_Schema>();
            try
            {

                //DataObjectArray[] SP_Parameters = new DataObjectArray[3];
                //for (int i = 0; i < SP_Parameters.Length; i++) { SP_Parameters[i] = new DataObjectArray(); }
                //SP_Parameters[0].ItemName = "exec ";
                //SP_Parameters[0].ItemValue = "SP_GET_USER_LIST";
                //SP_Parameters[0].ItemDataType = "string";

                //SP_Parameters[1].ItemName = "AGENT_GID";
                //SP_Parameters[1].ItemValue = "11342AC7-1ADF-4653-8B8B-A570F74BB5BD";
                //SP_Parameters[1].ItemDataType = "string";


                //SP_Parameters[2].ItemName = "COMPANY_GID";
                //SP_Parameters[2].ItemValue = "6B97684A-A773-436B-8353-9C006091621C";
                //SP_Parameters[2].ItemDataType = "string";
                string spstring = "exec SP_GET_USER_LIST @AGENT_GID='11342AC7-1ADF-4653-8B8B-A570F74BB5BD',@COMPANY_GID='6B97684A-A773-436B-8353-9C006091621C'";
                using (DataTable output_table = DataService_Obj.GetDataByURL(spstring))
                {


                    if (output_table != null)
                    {
                        UserList_RPT = new List<USerDetails_Schema>();
                        foreach (DataRow dataRow in output_table.Rows)
                        {
                            UserList_RPT.Add(new USerDetails_Schema
                            {
                                Address = dataRow["Address"].ToString(),
                                Contact = dataRow["Phone"].ToString(),
                                JoiningDate = dataRow["JoiningDate"].ToString(),
                                Email = dataRow["Email"].ToString(),
                                Name = dataRow["userName"].ToString(),
                            });
                        }
                    }

                }
                if (UserList_RPT != null)
                {
                    Report = new UserReport(); Report.DataSource = UserList_RPT;
                    DataLayer.GetData(Report);
                     await jsRunTime.InvokeVoidAsync("open", "/Viewer", "_blank");
                    //NavigationManager.NavigateTo("/Viewer");
                }
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                UserList_RPT = null;

                Report = null;
            }
        }
    }
}

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
        public async void PrintReport(int id) 
        {
            List<USerDetails_Schema> UserList_RPT = new List<USerDetails_Schema>();
            List<USerDetails_Schema> UserList_RPT1 = new List<USerDetails_Schema>();
            List<USerDetails_Schema> UserList_RPT2 = new List<USerDetails_Schema>();
            try
            {
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                UserList_RPT.Add(new USerDetails_Schema { Address = "uae", Contact = "2593698524", JoiningDate = "18-10-2022", Email = "ali@gmail.com",   Name = "ali"});
                UserList_RPT.Add(new USerDetails_Schema { Address = "pak", Contact = "2593698524", JoiningDate = "15-11-2020", Email = "akbar@gmail.com", Name = "akbar" });
                UserList_RPT.Add(new USerDetails_Schema { Address = "isb", Contact = "2593698524", JoiningDate = "12-12-2020", Email = "aslam@gmail.com", Name = "aslam" });
                UserList_RPT.Add(new USerDetails_Schema { Address = "lhr", Contact = "2593698524", JoiningDate = "14-08-2020", Email = "ahmad@gmail.com", Name = "ahmad" });
                //////////////////////////////////////////////////////////////////////////////////////////////////////////
                UserList_RPT1.Add(new USerDetails_Schema { Address = "uae", Contact = "2593698524", JoiningDate = "8-10-2022", Email = "ali@gmail.com", Name = "ali" });
                UserList_RPT1.Add(new USerDetails_Schema { Address = "pak", Contact = "2593698524", JoiningDate = "5-11-2022", Email = "akbar@gmail.com", Name = "akbar" });
                UserList_RPT1.Add(new USerDetails_Schema { Address = "isb", Contact = "2593698524", JoiningDate = "2-12-2021", Email = "aslam@gmail.com", Name = "aslam" });
                UserList_RPT1.Add(new USerDetails_Schema { Address = "lhr", Contact = "2593698524", JoiningDate = "4-08-2022", Email = "ahmad@gmail.com", Name = "ahmad" });
                //////////////////////////////////////////////////////////////////////////////////////////////////////////
                UserList_RPT2.Add(new USerDetails_Schema { Address = "uae", Contact = "2593698524", JoiningDate = "18-01-2022", Email = "ali@gmail.com", Name = "ali" });
                UserList_RPT2.Add(new USerDetails_Schema { Address = "pak", Contact = "2593698524", JoiningDate = "15-01-2021", Email = "akbar@gmail.com", Name = "akbar" });
                UserList_RPT2.Add(new USerDetails_Schema { Address = "isb", Contact = "2593698524", JoiningDate = "12-01-2021", Email = "aslam@gmail.com", Name = "aslam" });
                UserList_RPT2.Add(new USerDetails_Schema { Address = "lhr", Contact = "2593698524", JoiningDate = "14-10-2021", Email = "ahmad@gmail.com", Name = "ahmad" });
                Report = new UserReport();
                if (id==1) 
                {
                    Report.DataSource = UserList_RPT;
                }
                else if (id==2) 
                {
                    Report.DataSource = UserList_RPT1;
                }
                else if (id==3) 
                {Report.DataSource = UserList_RPT2;
                }
                
                
                DataLayer.GetData(Report);
                await jsRunTime.InvokeVoidAsync("open","/Viewer","_blank");
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                UserList_RPT = null;
                UserList_RPT1= null;
                UserList_RPT2 = null;
                Report = null;
            }
        }
    }
}

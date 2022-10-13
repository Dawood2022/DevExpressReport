using Newtonsoft.Json;
using ReportSample.Data;
using System.Data;
using System.Net;
using System.Net.Http.Json;
using System.Text;

namespace ReportSample.Services
{
    public class DataService : IDataService
    {private readonly HttpClient httpClient;
        public DataService(HttpClient _httpClient)
        {
            httpClient = _httpClient;
        }
        public async Task<DataTable> GetDataByArray(DataObjectArray[] objectArray)
        {
            DataTable dataTable=new DataTable();
                using (var obj= await httpClient.PostAsJsonAsync<object>("http://192.168.0.79/LiveExController/api/FindDataByARRAY/", objectArray)) 
                { 
                try
                {
                    string outputstring = obj.ToString();
                    if (outputstring!= "{\"DocumentElement\":null}")
                    {
                        
                            outputstring = outputstring.Replace("{\"DocumentElement\":{\"GeneralData\":", "").Trim();
                            outputstring = outputstring.Replace("}]}}", "}]").Replace("}}}", "}");
                            if (outputstring.Substring(0, 1) != "[")
                            {
                                outputstring = "[" + outputstring + "]";

                            }
                        var temp = JsonConvert.DeserializeObject(outputstring.ToString());
                       


                        dataTable=(DataTable)JsonConvert.DeserializeObject(temp.ToString(), (typeof(DataTable)));


                    }
                }
                catch (Exception)
                {
                    throw;
                }
                finally { httpClient.Dispose();  }
            }
           return dataTable;
        }

        public DataTable GetDataByURL(string URLstring)
        {
            DataTable dt = new DataTable();
            WebClient web = new WebClient();

            string url = string.Format("http://192.168.0.79/LiveExController/api/FindDataByGId/" + URLstring);
            web.Encoding = Encoding.UTF8;
            string response = web.DownloadString(url);
            if (response != "<DocumentElement />")
            {
                DataSet ds = new DataSet();
                using (StringReader stringReader = new StringReader(response))
                {
                    ds = new DataSet();
                    ds.ReadXml(stringReader);
                }

                return dt = ds.Tables[0];

            }
            else
            {
                return dt = null;

            }
        }
    }
}

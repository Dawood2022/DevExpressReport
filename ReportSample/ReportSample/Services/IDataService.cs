using ReportSample.Data;
using System.Data;

namespace ReportSample.Services
{
    public interface IDataService
    {
        Task<DataTable> GetDataByArray(DataObjectArray[] objectArray);
        DataTable GetDataByURL(string URLstring);
    }
}

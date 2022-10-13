using DevExpress.XtraReports.UI;

namespace ReportSample.Data
{
    public static class DataLayer
    {
        static XtraReport Report { get; set; }
       public static void GetData(XtraReport _Report) { Report = _Report; }
      public  static XtraReport SetData() { return Report; }

    }
}

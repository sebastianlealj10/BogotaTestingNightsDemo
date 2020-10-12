using System;

namespace BogotaTestingNights
{
    public class LocationResponse
    {
        public Info info { get; set; }
        public Result[] results { get; set; }

        public class Info
        {
            public int count { get; set; }
            public int pages { get; set; }
            public object next { get; set; }
            public object prev { get; set; }
        }

        public class Result
        {
            public int id { get; set; }
            public string name { get; set; }
            public string type { get; set; }
            public string dimension { get; set; }
            public string[] residents { get; set; }
            public string url { get; set; }
            public DateTime created { get; set; }
        }

    }
}

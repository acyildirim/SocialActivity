using System;

namespace Domain
{
    public class Activity
    {
        // We use GUID because it can be generated on both client and server side 
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }
}
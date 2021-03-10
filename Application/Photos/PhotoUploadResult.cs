namespace Application.Photos
{

    //Application layer is not gonna access to infrastructure layer and class uploadresult that we got from cloudinary
    //That's why this class created.
    public class PhotoUploadResult
    {
        public string PublicId { get; set; }
        public string Url { get; set; }
    }
}
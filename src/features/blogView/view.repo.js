import BlogViews from "./view.model.js";

const addViewRepo = async ({ blogId, viewerId }) => {
  await BlogViews.findOneAndUpdate(
    { viewerId, blogId }, // filter
    {
      $inc: { totalViews: 1 }, // increment if the doc exists
      $setOnInsert: { totalViews: 1 }, // if doc doesn't exist → set counter = 1
    },{
        new: true,upsert:true
      }
  );
};



const getProfileOfiewersRepo = async (blogId)=>{
    const result = await BlogViews.find({blogId}).populate({
        path:"viewerId",
        select:"thumbnail profilePic _id fullName userName"
    });

    return result;
}

const getUserViewedBlogsRepo = async(viewerId)=>{
    const blogs = await BlogViews.find({viewerId})
        .populate("blogId")                       // First level
        .populate({
            path: "authorId",
            populate: { path: "fullName _id userName profilePic" }            // Second level
        });

     return blogs;
}



export { addViewRepo, getProfileOfiewersRepo ,getUserViewedBlogsRepo};

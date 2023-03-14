const User = ({ userProfile }) => {
  if (!userProfile) {
    return null
  }
  return (
    <div>
      <h2>{userProfile.name}</h2>
      <strong>added blogs</strong>
      <ul>
        {userProfile.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}
export default User

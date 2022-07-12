const withRoles = (handler, ...roles) => {
  return async (req, res) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Нет прав доступа!',
      })
    }
    return handler(req, res)
  }
}
export default withRoles

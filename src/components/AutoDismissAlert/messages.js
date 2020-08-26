// We will want to add the username to the Sign In success message. I think we should do this by
// using ${credentials.username} in the signIn Success message using tic marks. The question is,
// where do we import that data from?

export default {
  signUpSuccess: 'Succesfully registered! You\'ve been signed in as well.',
  signUpFailure: 'Registration failed. Email may be taken, or passwords don\'t match.',
  signInSuccess: 'Welcome!',
  signInFailure: 'Failed to sign in. Check your email and password and try again.',
  signOutSuccess: 'Come back soon!',
  changePasswordSuccess: 'Password changed successfully!',
  changePasswordFailure: 'Failed to change passwords. Check your old password and try again.',
  createPostSuccess: 'Created Post Successfully',
  createPostFailure: 'Failed To Create Post',
  deletePostSuccess: 'Deleted Post Successfully'
}

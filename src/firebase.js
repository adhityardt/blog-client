import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  // Populate your firebase configuration data here.
  apiKey: 'AIzaSyDTUok54H8dglMjql8OWWxXaJ5HXjmIIyg',
  authDomain: 'blog-d4266.firebaseapp.com',
  databaseURL: 'https://blog-d4266.firebaseio.com',
  projectId: 'blog-d4266',
  storageBucket: 'blog-d4266.appspot.com',
  messagingSenderId: '545102028382'
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()

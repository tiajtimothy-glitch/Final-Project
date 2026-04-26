import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [tweets, setTweets] = useState(() => {
    const saved = localStorage.getItem('tweets')
    if (saved) return JSON.parse(saved)
    return [
      { id: 1, name: 'Zoe', handle: '@zoe', text: 'Welcome to my Twitter clone! Built with React 🚀', likes: 3, liked: false, time: 'now' },
      { id: 2, name: 'React', handle: '@reactjs', text: 'A JavaScript library for building user interfaces.', likes: 12, liked: false, time: '2h' },
    ]
  })

  const [newTweet, setNewTweet] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [page, setPage] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const composeRef = useRef(null)

  const [notifications, setNotifications] = useState([
    { id: 1, text: '❤️ React liked your tweet', time: '1h', read: false },
    { id: 2, text: '👤 New follower: @reactjs', time: '3h', read: false },
    { id: 3, text: '💬 You have a new reply', time: '5h', read: false },
  ])

  const [messages, setMessages] = useState([
    { id: 1, name: 'React', handle: '@reactjs', text: 'Hey, welcome to Twitter!', time: '2h' },
    { id: 2, name: 'Vite', handle: '@vite_js', text: 'Your build is ready 🚀', time: '4h' },
    { id: 3, name: 'JavaScript', handle: '@js', text: 'Check out the new ES2026 features!', time: '1d' },
  ])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    localStorage.setItem('tweets', JSON.stringify(tweets))
  }, [tweets])

  const handlePost = () => {
    if (newTweet.trim() === '') return
    const tweet = {
      id: Date.now(),
      name: 'Zoe',
      handle: '@zoe',
      text: newTweet,
      likes: 0,
      liked: false,
      time: 'now',
    }
    setTweets([tweet, ...tweets])
    setNewTweet('')
  }

  const focusCompose = () => {
    setPage('home')
    setTimeout(() => {
      if (composeRef.current) composeRef.current.focus()
    }, 0)
  }

  const startEdit = (id, currentText) => {
    setEditingId(id)
    setEditText(currentText)
  }

  const saveEdit = (id) => {
    setTweets(tweets.map((t) => (t.id === id ? { ...t, text: editText } : t)))
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this tweet?')) {
      setTweets(tweets.filter((t) => t.id !== id))
    }
  }

  const toggleLike = (id) => {
    setTweets(
      tweets.map((t) =>
        t.id === id
          ? { ...t, liked: !t.liked, likes: t.liked ? t.likes - 1 : t.likes + 1 }
          : t
      )
    )
  }

  const sendMessage = () => {
    if (newMessage.trim() === '') return
    setMessages([
      { id: Date.now(), name: 'Zoe', handle: '@zoe', text: newMessage, time: 'now' },
      ...messages,
    ])
    setNewMessage('')
  }

  const openNotifications = () => {
    setPage('notifications')
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const navClick = (e, target) => {
    e.preventDefault()
    setPage(target)
  }

  const filteredTweets = tweets.filter((t) =>
    t.text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  const pageTitles = {
    home: 'Home',
    explore: 'Explore',
    notifications: 'Notifications',
    messages: 'Messages',
    bookmarks: 'Bookmarks',
    profile: 'Profile',
  }

  const renderPage = () => {
    if (page === 'notifications') {
      return (
        <div className="page">
          {notifications.length === 0 && <p className="empty">No notifications yet.</p>}
          {notifications.map((n) => (
            <div key={n.id} className="notif">
              <p>{n.text}</p>
              <small>{n.time}</small>
            </div>
          ))}
        </div>
      )
    }

    if (page === 'messages') {
      return (
        <div className="page">
          <div className="compose">
            <div className="avatar">Z</div>
            <div className="compose-body">
              <textarea
                className="compose-input"
                placeholder="Send a new message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <div className="compose-actions">
                <span className="char-count">{newMessage.length} chars</span>
                <button className="post-btn small" onClick={sendMessage} disabled={!newMessage.trim()}>
                  Send
                </button>
              </div>
            </div>
          </div>
          {messages.map((m) => (
            <div key={m.id} className="tweet">
              <div className="avatar">{m.name[0]}</div>
              <div className="tweet-body">
                <div className="tweet-header">
                  <span className="tweet-name">{m.name}</span>
                  <span className="tweet-handle">{m.handle}</span>
                  <span className="dot">·</span>
                  <span className="tweet-time">{m.time}</span>
                </div>
                <p className="tweet-text">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (page === 'explore') {
      return (
        <div className="page">
          <div className="search-wrap" style={{ padding: '12px 16px' }}>
            <input
              className="search"
              type="text"
              placeholder="Search tweets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          {filteredTweets.length === 0 && (
            <p className="empty">No tweets match "{searchTerm}"</p>
          )}
          {filteredTweets.map((tweet) => (
            <article key={tweet.id} className="tweet">
              <div className="avatar">{tweet.name[0]}</div>
              <div className="tweet-body">
                <div className="tweet-header">
                  <span className="tweet-name">{tweet.name}</span>
                  <span className="tweet-handle">{tweet.handle}</span>
                  <span className="dot">·</span>
                  <span className="tweet-time">{tweet.time}</span>
                </div>
                <p className="tweet-text">{tweet.text}</p>
              </div>
            </article>
          ))}
        </div>
      )
    }

    if (page === 'bookmarks') {
      return (
        <div className="page">
          <p className="empty">You haven't bookmarked anything yet.</p>
        </div>
      )
    }

    if (page === 'profile') {
      const myTweets = tweets.filter((t) => t.handle === '@zoe')
      return (
        <div className="page">
          <div className="profile-card">
            <div className="avatar large">Z</div>
            <h3>Zoe</h3>
            <p className="user-handle">@zoe</p>
            <p>Beginner web dev 👩‍💻 building a Twitter clone for my final project!</p>
            <p><strong>{myTweets.length}</strong> tweets · <strong>0</strong> following · <strong>1</strong> follower</p>
          </div>
          {myTweets.map((tweet) => (
            <article key={tweet.id} className="tweet">
              <div className="avatar">{tweet.name[0]}</div>
              <div className="tweet-body">
                <div className="tweet-header">
                  <span className="tweet-name">{tweet.name}</span>
                  <span className="tweet-handle">{tweet.handle}</span>
                  <span className="dot">·</span>
                  <span className="tweet-time">{tweet.time}</span>
                </div>
                <p className="tweet-text">{tweet.text}</p>
              </div>
            </article>
          ))}
        </div>
      )
    }

    return (
      <>
        <div className="compose">
          <div className="avatar">Z</div>
          <div className="compose-body">
            <textarea
              ref={composeRef}
              className="compose-input"
              placeholder="What's happening?"
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
              maxLength={280}
            />
            <div className="compose-actions">
              <span className="char-count">{newTweet.length}/280</span>
              <button className="post-btn small" onClick={handlePost} disabled={!newTweet.trim()}>
                Post
              </button>
            </div>
          </div>
        </div>

        <div className="tweet-list">
          {tweets.length === 0 && <p className="empty">No tweets yet. Post something above!</p>}
          {tweets.map((tweet) => (
            <article key={tweet.id} className="tweet">
              <div className="avatar">{tweet.name[0]}</div>
              <div className="tweet-body">
                <div className="tweet-header">
                  <span className="tweet-name">{tweet.name}</span>
                  <span className="tweet-handle">{tweet.handle}</span>
                  <span className="dot">·</span>
                  <span className="tweet-time">{tweet.time}</span>
                </div>

                {editingId === tweet.id ? (
                  <div className="edit-area">
                    <textarea
                      className="edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      maxLength={280}
                    />
                    <div className="edit-buttons">
                      <button className="post-btn small" onClick={() => saveEdit(tweet.id)}>Save</button>
                      <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <p className="tweet-text">{tweet.text}</p>
                )}

                <div className="tweet-actions">
                  <button className="action">💬 <span>0</span></button>
                  <button
                    className={`action like ${tweet.liked ? 'liked' : ''}`}
                    onClick={() => toggleLike(tweet.id)}
                  >
                    {tweet.liked ? '❤️' : '🤍'} <span>{tweet.likes}</span>
                  </button>
                  <button className="action" onClick={() => startEdit(tweet.id, tweet.text)}>
                    ✏️ <span>Edit</span>
                  </button>
                  <button className="action delete" onClick={() => handleDelete(tweet.id)}>
                    🗑️ <span>Delete</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
  <svg viewBox="0 0 24 24" width="32" height="32" fill="#1d9bf0">
    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.39.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
  </svg>
</div>
        <nav className="nav">
          <a href="#" className={`nav-item ${page === 'home' ? 'active' : ''}`} onClick={(e) => navClick(e, 'home')}>🏠 <span>Home</span></a>
          <a href="#" className={`nav-item ${page === 'explore' ? 'active' : ''}`} onClick={(e) => navClick(e, 'explore')}>🔍 <span>Explore</span></a>
          <a href="#" className={`nav-item ${page === 'notifications' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); openNotifications() }}>
            🔔 <span>Notifications {unreadCount > 0 && <span className="badge">{unreadCount}</span>}</span>
          </a>
          <a href="#" className={`nav-item ${page === 'messages' ? 'active' : ''}`} onClick={(e) => navClick(e, 'messages')}>✉️ <span>Messages</span></a>
          <a href="#" className={`nav-item ${page === 'bookmarks' ? 'active' : ''}`} onClick={(e) => navClick(e, 'bookmarks')}>🔖 <span>Bookmarks</span></a>
          <a href="#" className={`nav-item ${page === 'profile' ? 'active' : ''}`} onClick={(e) => navClick(e, 'profile')}>👤 <span>Profile</span></a>
        </nav>
        <button className="post-btn" onClick={focusCompose}>Post</button>
        <div className="user-card" onClick={() => setPage('profile')}>
          <div className="avatar">Z</div>
          <div>
            <div className="user-name">Zoe</div>
            <div className="user-handle">@zoe</div>
          </div>
        </div>
      </aside>

      <main className="feed">
        <header className="feed-header">
          <h2>{pageTitles[page]}</h2>
        </header>
        {renderPage()}
      </main>

      <aside className="trends"></aside>
        <div className="search-wrap">
          <input
            className="search"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              if (e.target.value) setPage('explore')
            }}
          />
        </div>
        <div className="trends-card"></div>
          <h3>What's happening</h3>
          <div className="trend" onClick={() => { setSearchTerm('React'); setPage('explore') }}>
            <small>Trending in Tech</small>
            <strong>#React</strong>
            <small>125K posts</small>
          </div>
          <div className="trend" onClick={() => { setSearchTerm('JavaScript'); setPage('explore') }}>
            <small>Web Development</small>
            <strong>#JavaScript</strong>
            <small>200K posts</small>
          </div>
          <div className="trend" onClick={() => { setSearchTerm('WebDev'); setPage('explore') }}>
            <small>Trending</small>
            <strong>#WebDev</strong>
            <small>89K posts</small>
          </div>
          <div className="trend" onClick={() => { setSearchTerm('Final'); setPage('explore') }}>
            <small>Education</small>
            <strong>#FinalProject</strong>
            <small>1.2K posts</small>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default App
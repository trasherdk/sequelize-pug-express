/*
// Example 2
const paginate = require('express-paginate')
router.get('/blog', (req, res, next) => {
  console.log(req.query)
  Blog.findAndCountAll({ limit: req.query.limit, offset: req.skip, order: [[req.query.sort, 'DESC']] })
    .then(results => {
      const itemCount = results.count
      const pageCount = Math.ceil(results.count / req.query.limit)
      res.render('test', {
        order: req.query.age,
        blogs: results.rows,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
      })
    }).catch(err => next(err))
})

// Exemple 1
router.get('/:page', (req, res) => {
  let limit = 2 // number of records per page
  let offset = 0
  Blog.findAndCountAll()
    .then((data) => {
      let page = req.params.page // page number
      let pages = Math.ceil(data.count / limit)
      offset = limit * (page - 1)
      Blog.findAll({
        limit: limit,
        offset: offset,
        $sort: { uuid: 1 }
      })
        .then((users) => {
          res.status(200).json({'result': users, 'count': data.count, 'pages': pages})
        })
    })
    .catch(function (error) {
      res.status(500).send('Internal Server Error' + error)
    })
})
*/


/*
router.get('/', async (req, res, next) => {
  try {
    let articles = await Blog.findAndCountAll({ limit: '3', offset: 3, order: [['createdAt', 'DESC']] })
    console.log(articles.count)
    let maxPage = Math.ceil(articles.count / '3')
    let array = []
    for (let i = maxPage; i >= 1; i--) {
      array.push(i)
    }
    res.render('index', {
      articles: articles.rows,
      array: array,
      currentPage: maxPage,
      prev: false,
      next: false
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', async (req, res, next) => {
  let offset = (req.params.id / 2) + 2
  try {
    let articles = await Blog.findAndCountAll({ limit: '2', offset: offset, order: [['createdAt', 'DESC']] })
    console.log(articles.count)
    let maxPage = Math.ceil(articles.count / '2')
    let array = []
    for (let i = maxPage; i >= 1; i--) {
      array.push(i)
    }
    res.render('index', {
      articles: articles.rows,
      array: array,
      currentPage: maxPage,
      prev: false,
      next: false
    })
  } catch (err) {
    console.log(err)
  }
})
*/
/*
async function page () {
}
*/
/*
const paginate = require('express-paginate')
router.get('/', (req, res, next) => {
  // console.log(req.query)
  // req.query.page = req.params.id
  Blog.findAndCountAll({ limit: '2', offset: req.skip })
    .then(results => {
      const itemCount = results.count
      const pageCount = Math.ceil(results.count / '2')
      console.log(paginate.getArrayPages(req))
      res.render('index', {
        articles: results.rows,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
      })
    }).catch(err => next(err))
})
*/
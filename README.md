# Untappd

A third-party API for accessing Untappd data.

## Functions

* `fetchUserStats`

```
  {
  total: 155,
  unique: 120,
  badges: 73,
  friends: 17,
  username: 'denolfe' 
  }
```

* `fetchLatestCheckin`

```
{ 
    name: 'Graham Cracker Porter',
  brewery: 'Denver Beer Co',
  rating: 4.25,
  image: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-GrahamCrackerPorter_71051.jpeg',
  time: 'Thu, 14 May 2015 01:46:14 +0000' 
}
```

* `fetchTopVenues`

```
[ { rank: 1,
    name: 'Founders Brewing Co.',
    category: 'Food (Brewery)',
    address: '235 Grandville Ave SW Grand Rapids, MI',
    firstVisit: '05/25/14',
    lastVisit: '12/30/14',
    checkins: 12 
}]
```

* `fetchRecentBeers`

```
[ { order: 1,
    name: 'Graham Cracker Porter',
    brewery: 'Denver Beer Co',
    style: 'Porter',
    abv: '5.6% ABV',
    ibu: 15,
    dateFirst: 'Thu, 07 May 2015 16:57:16 -0600',
    dateRecent: 'Wed, 13 May 2015 19:46:14 -0600',
    checkins: 3,
    rating: 3.78,
    globalRating: 3.78 
}]
```

* `fetchMostFrequentBeers`
* `fetchHighestRatedBeers`


##To Do

* Proper tests using mocha/chai
* Fetch Badges
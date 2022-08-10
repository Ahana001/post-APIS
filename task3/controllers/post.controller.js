const postCollection = require('../model/post.model');
const createError = require('http-errors');
const apiip = require('apiip.net')('66b5b5d2-c868-449b-8638-1d72fd4a4588');
const ipaddr = require('ipaddr.js');
const addPost = async (req, res, next) => {
    const userId = req.user._id;
    var ip;
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }
    if (ipaddr.isValid(ip)) {
        const addr = ipaddr.parse(ip);
        if (addr.kind() === 'ipv6' && addr.isIPv4MappedAddress()) {
            ip = addr.toIPv4Address().toString();
        }
    }
    if (ip === "127.0.0.1") {
        ip = "207.97.227.239"
    }
    apiip
        .getLocation({
            ip: ip
        }).then(async (results) => {
            const { title, body, createdBy } = req.body;
            const newPost = await postCollection.create({
                title,
                body,
                createdBy,
                geolocation: {
                    latitude: results.latitude,
                    longitude: results.longitude,
                },
                userId
            });
            if (newPost) {
                res.status(201).json({
                    "message": "post created",
                    id: newPost._id
                });
            } else {
                next(createError.InternalServerError())
            }
        })
        .catch((error) => {
            console.log(error)
            next(createError.InternalServerError())
        });


}
const updatePost = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const { title, body, createdBy, geolocation } = req.body;
    const post = await postCollection.findOneAndUpdate({ _id: postId, userId: userId }, {
        $set: {
            title,
            body,
            createdBy,
            geolocation
        }
    });
    if (post) {
        res.status(200).send("updated post");
    } else {
        next(createError.BadRequest())
    }
}
const getPost = async (req, res, next) => {
    const userId = req.user._id;
    const posts = await postCollection.find({ userId: userId });
    res.status(200).send(posts);
}
const deletePost = async (req, res, next) => {
    const userId = req.user.id;
    const postId = req.params.id;
    const post = await postCollection.deleteOne({ _id: postId, userId: userId });
    console.log(userId, postId, post)
    if (post.deletedCount !== 0) {
        res.status(200).send({
            "message": "deleted post",
            id: post._id
        });
    } else {
        next(createError.BadRequest());
    }
}
const getGeoPost = async (req, res, next) => {
    const userId = req.user._id;
    var ip;
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }
    if (ipaddr.isValid(ip)) {
        const addr = ipaddr.parse(ip);
        if (addr.kind() === 'ipv6' && addr.isIPv4MappedAddress()) {
            ip = addr.toIPv4Address().toString();
        }
    }
    if (ip == "127.0.0.1") {
        ip = "207.97.227.239"
    }
    console.log(ip)
    apiip
        .getLocation({
            ip: ip
        }).then(async (results) => {
            const post = await postCollection.find({
                geolocation: {
                    $elemMatch: {
                        latitude: results.latitude,
                        longitude: results.longitude
                    }
                }
            });
            if (post) {
                res.status(201).json(post);
            } else {
                next(createError.InternalServerError())
            }
        })
        .catch((error) => {
            console.log(error)
            next(createError.InternalServerError())
        });

}
module.exports = { addPost, updatePost, getPost, deletePost, getGeoPost };
const Page = require('../models/Page');

const getAllContent = async (req, res, next) => {
  try {
    const pages = await Page.find({});
    // Transform into key-value map by section/slug for easy frontend consumption
    const contentMap = {};
    pages.forEach(page => {
      contentMap[page.slug] = {
        title: page.title,
        slug: page.slug,
        blocks: page.blocks,
        content: page.content,
        updatedAt: page.updatedAt
      };
    });
    res.json(contentMap);
  } catch (error) {
    next(error);
  }
};

const getSectionContent = async (req, res, next) => {
  try {
    const { section } = req.params;
    const page = await Page.findOne({ slug: section.toLowerCase() });
    
    if (!page) {
      return res.status(404).json({ message: `Section '${section}' not found` });
    }

    res.json({
      title: page.title,
      slug: page.slug,
      blocks: page.blocks,
      content: page.content,
      updatedAt: page.updatedAt
    });
  } catch (error) {
    next(error);
  }
};

const updateSectionContent = async (req, res, next) => {
  try {
    const { section } = req.params;
    const { title, blocks, content } = req.body;

    let page = await Page.findOne({ slug: section.toLowerCase() });

    if (!page) {
      page = new Page({
        title: title || section.toUpperCase(),
        slug: section.toLowerCase(),
        blocks: blocks || [],
        content: content || {}
      });
    } else {
      if (title !== undefined) page.title = title;
      if (blocks !== undefined) page.blocks = blocks;
      if (content !== undefined) page.content = content;
    }

    await page.save();

    res.json({
      message: `Section '${section}' updated successfully`,
      data: {
        title: page.title,
        slug: page.slug,
        blocks: page.blocks,
        content: page.content,
        updatedAt: page.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContent,
  getSectionContent,
  updateSectionContent
};

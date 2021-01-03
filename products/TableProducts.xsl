<?xml version="1.0" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
      <xsl:for-each select="/products/category">
        <div class="container">
          <div class="row mt-4">
            <h2><xsl:value-of select="@name" /></h2>
          </div>
          <div class="row">
            <xsl:for-each select="product">
              <div class="col-lg-2 col-md-3 col-sm-4 mt-2">
                <img src="https://via.placeholder.com/150x150" alt=""/>
                <div class="row" style="min-height: 150px;">
                  <div class="col-md-12 mt-1">
                    <h6><xsl:value-of select="title" /></h6>
                  </div>
                  <div class="col-12 mt-1">
                    <i class="material-icons md-18">star</i>
                    <i class="material-icons md-18">star</i>          
                    <i class="material-icons md-18">star</i>
                    <i class="material-icons md-18">star_half</i>
                    <i class="material-icons md-18">star_border</i>
                  </div>
                  <div class="col-md-12">
                    <p>€<xsl:value-of select="price" /></p>
                  </div>
                </div>
                <div class="row">     
                  <div class="col-md-12 align-bottom">
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" data-id="{id}">Edit</button>
                    <button type="button" class="btn btn-danger" style="margin-left:10px;" onclick="deleteProduct(`{id}`)">Delete</button>
                  </div>
                </div>
              </div>
            </xsl:for-each>
          </div>
        </div>
      </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>
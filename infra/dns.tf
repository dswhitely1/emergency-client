data "aws_route53_zone" "site" {
  name         = var.domain_name
  private_zone = false
}

# Easy DKIM always issues three tokens; count (not for_each) keeps plan working before they exist.
resource "aws_route53_record" "dkim" {
  count   = 3
  zone_id = data.aws_route53_zone.site.zone_id
  name    = "${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}._domainkey.${var.domain_name}"
  type    = "CNAME"
  ttl     = 1800
  records = ["${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}.dkim.amazonses.com"]
}

resource "aws_route53_record" "mail_from_mx" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = local.mail_from
  type    = "MX"
  ttl     = 1800
  records = ["10 feedback-smtp.${var.aws_region}.amazonses.com"]
}

resource "aws_route53_record" "mail_from_spf" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = local.mail_from
  type    = "TXT"
  ttl     = 1800
  records = [local.spf_record]
}

resource "aws_route53_record" "dmarc" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = "_dmarc.${var.domain_name}"
  type    = "TXT"
  ttl     = 1800
  records = [local.dmarc_record]
}

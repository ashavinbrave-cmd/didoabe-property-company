# Private management portal contract (not connected)

The public Vacant Houses feature currently uses its clearly labelled sample
listings. No request is sent to the private portal. This folder contains pure
mapping functions to prepare the two applications for a later, separately
configured connection.

## Property feed

The portal shape is `ManagementPortalProperty`. The adapter maps portal prices,
descriptions, conditions, and `/uploads/...` photo paths into the public
`PropertyListing` model. It returns `null` for unpublished or non-`Available`
properties. The portal API also enforces this rule for public list, detail,
and application endpoints.

## Applications

The public form gathers applicant name, email, and phone. The adapter maps
these to the portal's `applicantName`, `applicantEmail`, and `applicantPhone`
fields and maps the optional alternative location into `message`.

## Vacancy inquiries

The public inquiry form collects a name, email, phone, and preferred location.
The adapter generates the required portal inquiry subject and message fields.

## Connection/security boundary

Do not put `PUBLIC_API_KEY`, staff credentials, or session tokens into the
public website bundle. Browser CORS is not authentication. When connection is
approved, route application writes through a trusted server-side proxy (or
explicitly configure a public endpoint with suitable abuse controls). Set the
portal's `PUBLIC_SITE_ORIGIN` to the exact production public site origin.
Configure the upload origin to the portal's HTTPS origin.

Until that work is explicitly enabled, the `App` does not import an API client,
fetch listings, or submit application payloads to the portal.

